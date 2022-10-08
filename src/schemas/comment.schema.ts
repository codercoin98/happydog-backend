import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
export type CommentDocument = Comment & Document;
@Schema({ versionKey: false })
export class Comment extends Document {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  post_id: ObjectId;
  @Prop({ required: true })
  content: string;
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  user_id: ObjectId;
  @Prop({ required: true, default: 0 })
  like: number;
  @Prop({ required: true, default: () => new Date() })
  created_at: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
