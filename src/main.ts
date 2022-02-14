import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // filtra los datos para solo recibir los datos que se esperan en el controlador a travez del DTO
      // forbidNonWhitelisted: true,//si se agrega un parametro extra en una peticion retorna un error
    }),
  );

  await app.listen(3000);
}
bootstrap();
