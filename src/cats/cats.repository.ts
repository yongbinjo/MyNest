import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";

export class CatsRepository{
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {

    }

}