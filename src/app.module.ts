import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UploadModule } from './modules/upload/upload.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReplyModule } from './modules/reply/reply.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/happydog'),
    AuthModule,
    UserModule,
    PostModule,
    UploadModule,
    CommentModule,
    ReplyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
