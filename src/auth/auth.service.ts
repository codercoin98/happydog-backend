import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class AuthService {
  signin() {
    return 'sign in';
  }
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
