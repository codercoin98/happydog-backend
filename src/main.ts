import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //所有请求前面携带/api
  app.setGlobalPrefix('api');
  //全局异常过滤
  app.useGlobalFilters(new HttpExceptionFilter());
  //配置session
  app.use(
    session({
      secret: 'HappyDog',
      rolling: true,
      resave: false,
      name: 'HappyDog.sid',
      cookie: { secure: false, maxAge: 9999999 }
    })
  );
  //配置静态资源的访问目录
  app.useStaticAssets(join(__dirname, 'images'));
  //使用swagger-api文档
  const config = new DocumentBuilder()
    .setTitle('api document for HappyDog')
    .setDescription('HappyDog api document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
