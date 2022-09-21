import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Response,
  Session,
  UseGuards,
  Req
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  //登录
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    console.log(req.user);
    return this.authService.signin(req.user);
  }
  //注册
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Session() session) {
    //验证验证码
    if (
      session.code.toLocaleLowerCase() !==
      createUserDto.captcha.toLocaleLowerCase()
    ) {
      return {
        status: 777,
        message: 'captcha not match'
      };
    }
    //查找是否已有用户名
    const res1 = await this.userService.findOneByUsername(
      createUserDto.username
    );
    if (res1) {
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
        message: 'success register'
      };
    }
    return {
      status: 500,
      message: 'server failure'
    };
  }
  //获取验证码
  @Get('code')
  genCaptcha(@Response() res, @Req() req) {
    const captcha = this.authService.genCaptcha();
    req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
