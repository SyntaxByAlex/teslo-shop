import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateProductDto {
    @ApiProperty({
        example: 'Product name',
        description: 'Product name',
        default: 'Product name'
    })
    @IsString()
    @MinLength(3)
    title: string

    @ApiProperty({
        example: 10,
        description: 'Product price',
        default: 10
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number

    @ApiProperty({
        example: 'Product description',
        description: 'Product description',
        default: 'Product description'
    })
    @IsString()
    @IsOptional()
    descripcion?: string

    @ApiProperty({
        example: 'Product slug',
        description: 'Product slug',
        default: 'Product slug'
    })
    @IsString()
    @IsOptional()
    slug?: string


    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 10
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    @ApiProperty({
        example: ['S', 'M', 'L', 'XL'],
        description: 'Product sizes',
        default: ['S', 'M', 'L', 'XL']
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[]

    @ApiProperty({
        example: 'men',
        description: 'Product gender',
        default: 'men'
    })
    @IsIn(['men', 'woman', 'kid', 'unisex'])
    gender: string

    @ApiProperty({
        example: ['Product tag 1', 'Product tag 2'],
        description: 'Product tags',
        default: ['Product tag 1', 'Product tag 2']
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[]

    @ApiProperty({
        example: ['Product image 1', 'Product image 2'],
        description: 'Product images',
        default: ['Product image 1', 'Product image 2']
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]
}
