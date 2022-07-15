import {Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    CatsModule,
    // MongooseModule.forRoot(process.env.MONGODB_URI, {
    //   useNewUrlParser:true,
    //   useUnifiedTopology:true,
    //   useCreateIndex:true,
    //   useFindAndModify:false,
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  private readonly isDev:boolean = process.env.MODE ==='dev' ? true : false;
  configure(consumer){
    mongoose.set('debug',this.isDev);
  }
}
