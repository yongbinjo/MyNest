import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Payload} from "./jwt.paload";
import {CatsRepository} from "../../cats/cats.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly catRepository : CatsRepository) {
        super({
           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           secretOrKey: "secretKey",
           // ignoreExpiration: false,
        });
    }

    async validate(payload:Payload){
        const cat = await this.catRepository.findCatByIdWithoutPassword(payload.sub);
        console.log('여기까지 오나요')
        if(cat){
            return cat; //request.user
        }
        else{
            throw new UnauthorizedException("접근 오류");
        }
    };

}