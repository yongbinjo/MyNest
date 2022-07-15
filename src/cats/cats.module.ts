import {forwardRef, Module} from '@nestjs/common';
import { CatsService } from './cats.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "./cats.schema";
import {CatsController} from "./cats.controller";
import {CatsRepository} from "./cats.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Cat.name, schema: CatSchema}]),
      forwardRef(()=>AuthModule), //catModule과 authModule이 서로 의존성 주입을 하려고함
  ],
  controllers: [CatsController],
  providers: [CatsService,CatsRepository],
  exports:[CatsService,CatsRepository]
})
export class CatsModule {}
