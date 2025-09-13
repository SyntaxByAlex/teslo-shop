import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/auth.entity';
import { GetUser } from './decorators/get-user.decorator copy';
import { GetRowHeaders } from './decorators/get-row-headers.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthToken(user);
  }


  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') email: String,
    @GetRowHeaders() rawHeaders: string[]
  ) {
    console.log(rawHeaders);

    return {
      ok: true,
      user,
      email,
      rawHeaders
    }
  }


  @Get('private2')
  @RoleProtected(ValidRoles.SUPER_USER, ValidRoles.USER)
  @UseGuards(AuthGuard(), UserRoleGuard)
  priavteRoute(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.ADMIN)
  priavteRoute3(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

}
