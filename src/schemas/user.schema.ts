import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true, minlength: 8, maxlength: 18 })
  username: string;
  @Prop({ required: true, minlength: 10 })
  password: string;
  @Prop({ required: false, maxlength: 18, default: 'undefined' })
  nickname: string;
  @Prop({
    required: false,
    default: 'http://localhost:3000/default_avatar.png'
  })
  avatar_url: string;
  @Prop({ required: false, default: '' })
  mood: string;
  @Prop({ required: false, maxlength: 50, default: '' })
  bio: string;
  @Prop({ required: true, default: 0 })
  following: number;
  @Prop({ required: true, default: 0 })
  follower: number;
  @Prop({ required: true, default: new Date() })
  created_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
