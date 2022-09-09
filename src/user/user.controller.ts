import { Controller, Get } from '@nestjs/common';
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
  //查找所有 user
  @Get('findAll')
  async findAll() {
    return this.userService.findAll();
  }
  // 查找某一个用户路由
  @Get('findOne')
  async findOne(@Query() query: any) {
    return this.userService.findOneById(query.id);
  }
  // 删除一个用户的路由
  @Delete(':id')
  deleteUser(@Param() param: any) {
    return this.userService.delete(param.sid);
  }
  // 更改用户信息的路由
  @Put(':id')
  updateUser(@Body() body: any, @Param() param: any) {
    return this.userService.updateUser(param.id, body);
  }
}
