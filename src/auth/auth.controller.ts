import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Response,
  UseGuards,
  Req,
  Session,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import {
  CAPTCHA_NOT_MATCH,
  USERNAME_ALREADY_EXISTS
} from '../common/constants/error_message';
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
      session?.captcha.toLowerCase() !== createUserDto.captcha.toLowerCase()
    ) {
      throw new BadRequestException(CAPTCHA_NOT_MATCH);
    }
    //查找是否已有用户名
    const res1 = await this.userService.findOneByUsername(
      createUserDto.username
    );
    if (res1) {
      //已经存在用户
      throw new BadRequestException(USERNAME_ALREADY_EXISTS);
    }
    //用户名未注册,进行注册
    const res2 = await this.userService.create(createUserDto);
    if (!res2) {
      //注册失败，抛出错误
      throw new InternalServerErrorException();
    }
    //注册成功，进行登录，办法token
    return this.authService.signin({
      username: res2.username,
      password: res2.password
    });
  }
  //获取验证码
  @Get('code')
  genCaptcha(@Response() res, @Req() req) {
    const captcha = this.authService.genCaptcha();
    req.session.captcha = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
