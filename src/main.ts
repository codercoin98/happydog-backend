import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //所有请求前面携带/api
  app.setGlobalPrefix('api');
  //全局异常过滤
  app.useGlobalFilters(new HttpExceptionFilter());
  //配置session
  app.use(
    session({
      secret: 'HappyDog',
      rolling: true,
      name: 'HappyDog.sid',
      cookie: { maxAge: 9999999 }
    })
  );
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
