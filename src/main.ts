import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { processEnv } from './common/constants';
import { SuccessInterceptor } from './common/interceptors/sucess.interceptor';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      name: 'session',
      keys: [processEnv.COOKIE_KEY],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new SuccessInterceptor());
  await app.listen(3000);
}
bootstrap();
