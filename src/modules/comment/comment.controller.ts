import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
  //查找对应帖子的所有的评论
  @Get('findAll')
  findPostAllComment(@Query('post_id') post_id: string) {
    return this.commentService.findPostAllCommentById(post_id);
  }
  @Delete('delete/:comment_id')
  remove(@Param('comment_id') comment_id: string) {
    return this.commentService.remove(comment_id);
  }
}
