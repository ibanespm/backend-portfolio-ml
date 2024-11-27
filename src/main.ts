import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar la validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si la solicitud contiene propiedades adicionales no definidas
      transform: true, // Transforma los objetos recibidos en instancias del DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
