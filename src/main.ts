import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('개발을 위한 API 문서')
  .setVersion('1.0')
  .addCookieAuth('connect.sid')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //지정해놓은 값이 아닌경우 에러를 내보내는 유효성 체크(추가값 X)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,//지정해준 타입으로 변경
    })
  )
  const port = process.env.PORT
  await app.listen(port);
  
  Logger.log(`${port}로 서버가 실행되었습니다.`)
}
bootstrap();
