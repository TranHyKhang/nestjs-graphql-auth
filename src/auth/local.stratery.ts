import {PassportStrategy} from '@nestjs/passport';
import { AuthService } from './auth.service';

import {Strategy} from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {

        console.log("run validate in locaStratery")
        console.log("Log Stratery", Strategy)
        const user = await this.authService.validateUser(username, password);

        if(!user) {
            throw new UnauthorizedException();
        }
        console.log("Log user validate in localStragery",user)
        return user;
    }


}