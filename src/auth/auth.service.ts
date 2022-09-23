import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as svgCaptcha from 'svg-captcha';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  //验证用户是否存在
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  //登录，颁发token
  signin(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
  //注册
  signup() {
    return 'sign up';
  }
  //生成验证码
  genCaptcha(): svgCaptcha.CaptchaObj {
    return svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#fafafa'
    });
  }
}
