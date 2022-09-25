import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from '../schemas/post.schema';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}
  async create(createPostDTO: CreatePostDTO): Promise<PostDocument> {
    const newPost = new this.postModel(createPostDTO);
    const result = await newPost.save();
    return result;
  }
  async findAllPost(): Promise<PostDocument[]> {
    return this.postModel.find().exec();
  }
}
