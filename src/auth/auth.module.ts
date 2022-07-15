import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {CatsModule} from "../cats/cats.module";

@Module({
  imports:[
      PassportModule.register({defaultStrategy:'jwt', session:false}),
      JwtModule.register({
        secret:'secretKey',
        signOptions:{ expiresIn:'1y'}
      }),
      forwardRef(()=>CatsModule), //서로 의존성 주입을 하려고 할때
      // forwardRef로 명시해야함
  ],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
