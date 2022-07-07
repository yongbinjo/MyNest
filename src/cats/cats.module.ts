import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "./cats.schema";
import {CatsController} from "./cats.controller";

@Module({
  imports: [MongooseModule.forFeature([{name: Cat.name, schema: CatSchema}])],
  controllers: [CatsController],
  providers: [CatsService],
  exports:[CatsService]
})
export class CatsModule {}
