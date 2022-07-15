import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {HttpException, Injectable} from "@nestjs/common";
import {CatRequestDdo} from "./dto";


@Injectable()
export class CatsRepository{
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
        console.log(CatsRepository.name);
    }

    async existByEmail(email:string) : Promise<boolean>{
        const result = await this.catModel.exists({email});
        console.log("result :" , result);
        return !!result;
    }

    async create(cat:CatRequestDdo): Promise<Cat>{
        return await this.catModel.create(cat)
    }

    async findCatByEmail(email:string):Promise<Cat>{
        const cat = await this.catModel.findOne({email});
        console.log("Cat:",cat);
        return cat;
    }

    async findCatByIdWithoutPassword(catId:string):Promise<Cat|null>{
        const cat = await this.catModel.findById(catId).select('-password');
        return cat;
    }
}