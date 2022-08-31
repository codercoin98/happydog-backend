import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Session } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //获取验证码
  @Get('code')
  genCaptcha(@Response() res, @Session() session) {
    const captcha = this.userService.genCaptcha();
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
