import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplySchema } from '../../schemas/reply.schema';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reply', schema: ReplySchema }])
  ],
  controllers: [ReplyController],
  providers: [ReplyService]
})
export class ReplyModule {}
