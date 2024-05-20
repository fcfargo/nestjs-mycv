import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import { UserResponseDto } from './dtos/users.response.dto';
import { UsersService } from './users.service';
import { Serialize } from '../common/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserResponseDto)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return this.userService.create(email, password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
