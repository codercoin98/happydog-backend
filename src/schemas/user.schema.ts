import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
