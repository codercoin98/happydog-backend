import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
export type ReplyDocument = Reply & Document;
@Schema({ versionKey: false })
export class Reply extends Document {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  post_id: ObjectId;
  @Prop({ required: true })
  content: string;
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  user_id: ObjectId;
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  reply_to_user_id: ObjectId;
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  reply_to_comment_id: ObjectId;
  @Prop({ type: mongoose.Types.ObjectId, default: null })
  reply_to_reply_id: ObjectId;
  @Prop({ required: true, default: 0 })
  like: number;
  @Prop({ required: true, default: () => new Date() })
  created_at: Date;
}
export const ReplySchema = SchemaFactory.createForClass(Reply);
