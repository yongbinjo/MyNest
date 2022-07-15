import {Body, Controller, Get, Param, Post, Query,Request, Redirect, Req, UseGuards} from '@nestjs/common';
import {CatRequestDdo} from "./dto";
import {LoginRequestDto} from "../auth/login.request.dto";
import {CatsService} from "./cats.service";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";


@Controller('cats')
export class CatsController {
    constructor(
        private readonly catService : CatsService,
        private readonly authService: AuthService,
    ){}
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@Req() req){
        console.log(req?.user)
        return req?.user;
    }
    @Get('info')
    getInfo(){
        return {
            id:'admin',
            password:'admin1234'
        };
    }
    @Post()
    async signUp(@Body() body : CatRequestDdo){
        console.log(body);
        return await this.catService.signUp(body);
    }
    @Post('login')
    async signIn(@Body() body : LoginRequestDto){
        console.log("요청들어옴");
        console.log(body);
        return await this.authService.jwtLogIn(body);
    }
}

