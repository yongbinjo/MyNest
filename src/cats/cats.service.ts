import {HttpException, Injectable} from '@nestjs/common';
import {CatRequestDdo} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt'
@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private readonly catModel:Model<Cat>) {
    }
    async signUp(body : CatRequestDdo){
        const {email, name, password} = body;
        const isCatExist = await this.catModel.exists({email})

        if(isCatExist){
            throw new HttpException("해당하는 고양이는 이미 존재합니다.", 403);
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const cat = await this.catModel.create({
            email, name,
            password:hashedPassword,
        });
        return cat.readOnlyData;
    }
}
