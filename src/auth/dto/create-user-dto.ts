import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

}