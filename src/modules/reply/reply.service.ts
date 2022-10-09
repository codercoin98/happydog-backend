import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { ReplyDocument } from 'src/schemas/reply.schema';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class ReplyService {
  constructor(@InjectModel('Reply') private replyModel: Model<ReplyDocument>) {}
  async create(createReplyDto: CreateReplyDto) {
    const info = {
      post_id: new mongoose.Types.ObjectId(createReplyDto.post_id),
      content: createReplyDto.content,
      user_id: new mongoose.Types.ObjectId(createReplyDto.user_id),
      reply_to_comment_id: new mongoose.Types.ObjectId(
        createReplyDto.reply_to_comment_id
      ),
      reply_to_reply_id:
        createReplyDto.reply_to_reply_id &&
        new mongoose.Types.ObjectId(createReplyDto.reply_to_reply_id)
    };
    const reply = new this.replyModel(info);
    return await reply.save();
  }
  //删除某一条评论
  async remove(id: string) {
    return await this.replyModel.deleteOne({
      _id: new mongoose.Types.ObjectId(id)
    });
  }
}
