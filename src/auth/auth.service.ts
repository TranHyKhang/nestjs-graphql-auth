import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-input';

import {JwtService} from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string) {
        console.log("run validateUser in authService!!!")

        const user = await this.userService.findOne(username);

        const passwordIsValid = await bcrypt.compare(password, user?.password);

        if(user && passwordIsValid) {
            const {password, ...result} = user;
            console.log("Log result in validateUser in AuthService",result)
            return result;
        }

        return null;
    }

    async login(user: User) {

        console.log("run login in authService!!!")
        


        return {
            access_token: this.jwtService.sign({
                user: user.username, 
                sub: user.id
            }),
            user
        }
    }

    async signUp(createUserInput: CreateUserInput) {
        const user = await this.userService.findOne(createUserInput.username);

        if(user) {
            throw new Error('User already exist');
        }

        const password = await bcrypt.hash(createUserInput.password, 10);

        return this.userService.create({
            ...createUserInput,
            password
        });
    }
}
