import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  // Cambiamos el adaptador a Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Habilitar la validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si la solicitud contiene propiedades adicionales no definidas
      transform: true, // Transforma los objetos recibidos en instancias del DTO
    }),
  );

  // Escuchar en el puerto definido por el entorno o el 3000
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0'); // Fastify requiere un host explícito para aceptar conexiones externas
}
bootstrap();
