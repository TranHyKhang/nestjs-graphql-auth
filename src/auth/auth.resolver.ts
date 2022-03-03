import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(
        @Args('loginUserInput') loginUserInput: LoginUserInput, 
        @Context() context
    ) {
        console.log("Run authResolver")
        console.log(context.user)
        return this.authService.login(context.user);
    }

    @Mutation(() => User)
    signup(
        @Args('createUserInput') createUserInput: CreateUserInput,
        @Context() context
    ) {
        return this.authService.signUp(createUserInput)
    }
    
}