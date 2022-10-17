import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
export type PostDocument = Post & Document;
@Schema({ versionKey: false })
export class Post extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  author_id: ObjectId;
  @Prop({ required: true })
  categories: string[];
  @Prop({ required: true, default: () => new Date() })
  created_at: Date;
}
export const PostSchema = SchemaFactory.createForClass(Post);
