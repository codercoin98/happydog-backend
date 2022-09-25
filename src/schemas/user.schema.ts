import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false, default: () => 'undefined' })
  nickname: string;
  @Prop({
    required: false,
    default: () => 'http://localhost:3000/default_avatar.png'
  })
  avatar_url: string;
  @Prop({ required: false })
  mood: string;
  @Prop({ required: true, default: () => new Date() })
  created_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
