import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file) {
    console.log(file);
    return {
      // 注意：值是数字，不能是字符串
      status: 200,
      url: `http://localhost:3000/${file.filename}`, // 图片 src ，必须
      alt: file.originalname, // 图片描述文字，非必须
      href: 'zzz' // 图片的链接，非必须
    };
  }
}
