import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  //未登录状态下验证，如果通过验证，validate() 方法返回的值自动创建一个 user 对象，并将其作为 req.user 分配给请求对象。
  async validate(username: string, password: string): Promise<any> {
    //验证用户
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
