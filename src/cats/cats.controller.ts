import {Body, Controller, Get, Param, Post, Query, Redirect, Req} from '@nestjs/common';
import {Request} from 'express';
import {CatRequestDdo} from "./dto";
import {CatSchema} from "./cats.schema";
import {CatsService} from "./cats.service";

@Controller('cats')
export class CatsController {
    constructor(private readonly catService : CatsService) {
    }
    @Get()
    getCurrentCat(@Param() param, @Query() query){
        console.log(param);
        console.log(query);
        return 'Current cat'
    }

    @Post("/sign")
    async signUp(@Body() body : CatRequestDdo){
        console.log(body);
        return await this.catService.signUp(body);
    }

}
