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
    const new_comment = await comment.save();
    return await this.commentModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(new_comment._id)
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
        $lookup: {
          from: 'replies',
          localField: '_id',
          foreignField: 'reply_to_comment_id',
          as: 'reply_list'
        }
      },
      {
        $project: {
          user_id: 0
        }
      }
    ]);
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
                localField: 'reply_to_user_id',
                foreignField: '_id',
                as: 'reply_to_user'
              }
            },
            {
              $project: {
                user_id: 0,
                reply_to_user_id: 0
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
  async deleteOneById(comment_id: string) {
    return await this.commentModel.deleteOne({
      _id: new mongoose.Types.ObjectId(comment_id)
    });
  }
}
