import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { PostDocument } from '../schemas/post.schema';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeleteResult } from '../mongo/result';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  //创建帖子
  @Post('create')
  async create(@Body() body: CreatePostDto): Promise<PostDocument> {
    return this.postService.create(body);
  }
  //查询所有帖子并过滤字段返回
  @Get('findAll')
  async findAllPost(): Promise<PostDocument[]> {
    return this.postService.findAllPost();
  }
  //根据id查询帖子
  @Get('findOne')
  async findOne(@Query('post_id') post_id: string): Promise<PostDocument[]> {
    return this.postService.findOne(post_id);
  }
  //根据id更新帖子
  @Put('update')
  async update(
    @Query('post_id') post_id: string,
    @Body() body: UpdatePostDto
  ): Promise<any> {
    console.log(body);
    return this.postService.update(post_id, body);
  }
  //根据id删除帖子
  @Delete('delete')
  async delete(@Query('post_id') post_id: string): Promise<DeleteResult> {
    return this.postService.delete(post_id);
  }
}
