import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import mongoose from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private commentModel: Model<CommentDocument>
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const info = {
      post_id: new mongoose.Types.ObjectId(createCommentDto.post_id),
      content: createCommentDto.content,
      user_id: new mongoose.Types.ObjectId(createCommentDto.user_id)
    };
    const comment = new this.commentModel(info);
    return await comment.save();
  }

  async findPostAllCommentById(post_id: string) {
    return await this.commentModel.aggregate([
      {
        $match: {
          post_id: new mongoose.Types.ObjectId(post_id)
        }
      },
      {
        $lookup: {
          from: 'replies',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                pipeline: [
                  {
                    $project: {
                      nickname: 1,
                      avatar_url: 1
                    }
                  }
                ],
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
              }
            },
            {
              $project: {
                user_id: 0
              }
            }
          ],
          localField: '_id',
          foreignField: 'reply_to_comment_id',
          as: 'reply_list'
        }
      },
      {
        $lookup: {
          from: 'users',
          pipeline: [
            {
              $project: {
                nickname: 1,
                avatar_url: 1
              }
            }
          ],
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          user_id: 0
        }
      }
    ]);
  }
  async remove(comment_id: string) {
    return await this.commentModel.remove({
      _id: new mongoose.Types.ObjectId(comment_id)
    });
  }
}
