import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type PostDocument = Post & Document;
@Schema({ versionKey: false })
export class Post extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: false })
  images_urls: string[];
  @Prop({ required: true })
  author_id: string;
  @Prop({ required: true, default: () => new Date() })
  created_at: Date;
}
export const PostSchema = SchemaFactory.createForClass(Post);
