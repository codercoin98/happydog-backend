import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:/happydog'),
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
