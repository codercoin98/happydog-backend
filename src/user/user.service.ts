import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as svgCaptcha from 'svg-captcha';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  //注册Schama后通过@InjectModel将User模型注入到UserService中
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  //创建用户
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    const temp = await createUser.save();
    return temp;
  }
  // 查找
  async findAll(): Promise<User[]> {
    // 这里是异步的
    const temp = await this.userModel.find().exec();
    return temp;
  }
  // 查找
  async findOne(id: number): Promise<User[]> {
    // 这里是异步的
    const temp = await this.userModel.find({ _id: id });
    return temp;
  }
  // 删除
  async delete(id: number) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    const temp = await this.userModel.remove({ _id: id });
    return temp;
  }
  // 修改
  async updateUser(id: number, data: any) {
    // 这里是异步的  remove 方法删除成功并返回相应的个数
    const temp = await this.userModel.updateOne({ _id: id }, { $set: data });
    return temp;
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
