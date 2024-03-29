import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import mongoose from 'mongoose';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeleteResult } from 'src/mongo/result';
import { PostCreateResult } from './types';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}
  async create(createPostDTO: CreatePostDto): Promise<PostCreateResult[]> {
    const postInfo = {
      title: createPostDTO.title,
      content: createPostDTO.content,
      author_id: new mongoose.Types.ObjectId(createPostDTO.author_id),
      categories: createPostDTO.categories
    };
    const newPost = new this.postModel(postInfo);
    const result = await newPost.save();
    return await this.postModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(result._id)
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
          localField: 'author_id',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $project: {
          author_id: 0
        }
      }
    ]);
  }
  //查找所有的帖子
  async findAllPost(
    currentPage: number,
    size: number
  ): Promise<PostDocument[]> {
    /** 聚合管道查询
     * $lookup实现多表查询(类似join)
     * from-需要连接的表,localField-本表需要与连接表匹配的字段，foreignField-连接表与本表匹配的字段，as-匹配的信息在本表的字段名
     * $project用于指定返回的字段
     */
    return await this.postModel.aggregate([
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
          localField: 'author_id',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'post_id',
          as: 'comments'
        }
      },
      { $addFields: { comment_count: { $size: '$comments' } } },
      {
        $project: {
          author_id: 0,
          comments: 0
        }
      },
      { $skip: (Number(currentPage) - 1) * Number(size) },
      { $limit: Number(size) }
    ]);
  }
  //根据id查找帖子
  async findOne(post_id: string): Promise<PostDocument[]> {
    return await this.postModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(post_id)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author_id',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $project: {
          author_id: 0,
          author: {
            password: 0
          }
        }
      }
    ]);
  }
  //根据id更新对应的帖子内容
  async update(post_id: string, data: UpdatePostDto): Promise<any> {
    const res = await this.postModel.updateOne(
      { _id: post_id, author_id: new mongoose.Types.ObjectId(data.author_id) },
      {
        $set: {
          title: data.title,
          content: data.content
        }
      }
    );
    return res;
  }
  //删除
  async delete(post_id: string): Promise<DeleteResult> {
    return this.postModel.remove({ _id: post_id });
  }
}
