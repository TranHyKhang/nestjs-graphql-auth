import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {

  private readonly users = [
    {
      id: 1, 
      username: 'khang',
      password: 'abc'
    },
    {
      id: 2, 
      username: 'hy',
      password: 'abc'
    },{
      id: 3, 
      username: 'tran',
      password: 'abc'
    },
  ]

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
      id: this.users.length + 1
    }

    this.users.push(user);

    console.log(this.users);

    return user;
  }

  findAll() {

    console.log("Run findAll in userService!!!")

    return this.users;
  }

  findOne(userName: string) {
    console.log("Run findOne in userService!!!")

    return this.users.find(user => user.username === userName);
  }

}
