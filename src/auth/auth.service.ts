import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CatsRepository} from "../cats/cats.repository";
import {LoginRequestDto} from "./login.request.dto";
import * as bcrypt from 'bcrypt'
import {JwtStrategy} from "./jwt/jwt.strategy";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly catsRepository:CatsRepository,
                private jwtService:JwtService
                ) {}

    async jwtLogIn(data:LoginRequestDto){
        const {email, password}=data

        const cat = await this.catsRepository.findCatByEmail(email);

        if(!cat){
            throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.');
        }
        const isPasswordValidated:boolean =await bcrypt.compare(
            password,
            cat.password
        );
        if(!isPasswordValidated){
            throw new UnauthorizedException("이메일과 비밀번호를 확인해 주세요.");
        }
        const payload = {email:email, sub:cat.id};
        return {
            token : this.jwtService.sign(payload)
        };
    }
}
