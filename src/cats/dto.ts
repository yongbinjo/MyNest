import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CatRequestDdo {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    email;

    @IsString()
    @IsNotEmpty()
    name;

    @IsString()
    @IsNotEmpty()
    password;
}
