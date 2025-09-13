import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsPositive, Min } from "class-validator"

export class PaginationDto {

    @ApiProperty({
        example: 10,
        description: 'Limit of products',
        default: 10
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number


    @ApiProperty({
        example: 0,
        description: 'Offset of products',
        default: 0
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number
}