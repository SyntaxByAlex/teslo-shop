import { Controller, Get, Post, UploadedFile, UseInterceptors, BadRequestException, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private configService: ConfigService) { }



  @Get(':imageName')
  async findFile(
    @Param('imageName') imageName: string,
    @Res() res: Response
  ) {
    const path = await this.filesService.findFile(imageName);

    return res.sendFile(path);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/upload/products',
      filename: fileNamer
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) throw new BadRequestException('File is required');

    const secureUrl = `${this.configService.get('HOST_API')}/files/${file.filename}`

    return {
      secureUrl
    };
  }

}
