import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostDocument } from '../schemas/post.schema';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('create')
  async create(@Body() body: CreatePostDTO): Promise<PostDocument> {
    return this.postService.create(body);
  }
  @Get('findAll')
  async findAllPost(): Promise<PostDocument[]> {
    return this.postService.findAllPost();
  }
  @Get('findOne')
  async findOne() {
    return 'nihao';
  }
}
