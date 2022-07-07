import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CatRequestDdo {
    @IsEmail()
    @IsNotEmpty()
    email;

    @IsString()
    @IsNotEmpty()
    name;

    @IsString()
    @IsNotEmpty()
    password;
}
