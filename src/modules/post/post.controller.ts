import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDocument } from '../../schemas/post.schema';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeleteResult } from '../../mongo/result';
import { GetPostParams, PostCreateResult } from './types';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  //创建帖子
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() body: CreatePostDto): Promise<PostCreateResult> {
    return (await this.postService.create(body)).pop();
  }
  //查询所有帖子并过滤字段返回
  @Get('findAll')
  async findAllPost(@Query() params: GetPostParams): Promise<PostDocument[]> {
    console.log(params);

    return this.postService.findAllPost(params.currentPage, params.size);
  }
  //根据id查询帖子
  @Get('findOne')
  async findOne(@Query('post_id') post_id: string): Promise<PostDocument[]> {
    return this.postService.findOne(post_id);
  }
  //根据id更新帖子
  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async update(
    @Query('post_id') post_id: string,
    @Body() body: UpdatePostDto
  ): Promise<any> {
    console.log(body);
    return this.postService.update(post_id, body);
  }
  //根据id删除帖子
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(@Query('post_id') post_id: string): Promise<DeleteResult> {
    return this.postService.delete(post_id);
  }
}
