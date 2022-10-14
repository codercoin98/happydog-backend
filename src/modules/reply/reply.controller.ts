import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post('create')
  create(@Body() createReplyDto: CreateReplyDto) {
    return this.replyService.create(createReplyDto);
  }
  @Delete('delete/:reply_id')
  remove(@Param('reply_id') reply_id: string) {
    return this.replyService.remove(reply_id);
  }
}
