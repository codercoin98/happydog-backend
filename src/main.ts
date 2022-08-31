import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'HappyDog',
      rolling: true,
      name: 'HappyDog.sid',
      cookie: { maxAge: 9999999 },
    }),
  );
  await app.listen(3000);
}
bootstrap();
