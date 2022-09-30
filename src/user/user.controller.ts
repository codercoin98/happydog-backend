import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Body,
  Delete,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
  //查找所有 user
  @Get('findAll')
  async findAll(): Promise<{ num: number }> {
    return this.userService.findAll();
  }
  // 查找某一个用户
  @Get('findOne')
  async findOne(@Query('uid') uid: string) {
    const user = await this.userService.findOneById(uid);
    return user;
  }
  // 删除一个用户
  @Delete('delete/:uid')
  deleteUser(@Param('uid') uid: string) {
    return this.userService.deleteOneById(uid);
  }
  // 更改用户信息
  @Put('update/:uid')
  async updateUser(@Body() body: UpdateUserDto, @Param('uid') uid: string) {
    const { modifiedCount } = await this.userService.updateUser(uid, body);
    if (modifiedCount === 1) {
      //更新成功，返回新的用户信息
      return this.userService.findOneById(uid);
    }
    return new InternalServerErrorException();
  }
}
