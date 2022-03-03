import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    console.log("Run findAll in userResolve!!!")

    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('userName') userName: string) {
    console.log("Run findOne in userResolve!!!")
    return this.usersService.findOne(userName);
  }

}