import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    MongooseModule.forRoot('mongodb://localhost:27017/happydog'),
    UploadModule,
    CommentModule,
    ReplyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
