import { Controller, Post, Body, Get, Response, Session } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    //查找是否已有用户名
    const res1 = await this.userService.findOneByUsername(
      createUserDto.username
    );
    if (res1.length > 0) {
      //已经存在用户
      return {
        status: 400,
        message: 'username repetition'
      };
    }
    //用户名未注册
    const res2 = await this.userService.create(createUserDto);
    if (res2) {
      return {
        status: 200,
        message: 'success'
      };
    }
    return {
      status: 500,
      message: 'failure'
    };
  }
  //获取验证码
  @Get('code')
  genCaptcha(@Response() res, @Session() session) {
    const captcha = this.authService.genCaptcha();
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
