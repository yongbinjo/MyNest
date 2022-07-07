import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, SchemaOptions} from 'mongoose';
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export type CatDocument = Cat & Document;

const options:SchemaOptions = {
    timestamps:true
}
@Schema(options)
export class Cat extends Document{
    @Prop(
    {required:true,unique:true}
    )
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @Prop()
    @IsString()
    @IsNotEmpty()
    name:string;

    @Prop()
    @IsString()
    @IsNotEmpty()
    password:string;

    @Prop()
    @IsString()
    imgUrl:string;

    readonly readOnlyData : {id:string, email:string, name:string}
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this:Cat){
    return {
        id:this.id,
        email:this.email,
        name:this.name,
    };
});
