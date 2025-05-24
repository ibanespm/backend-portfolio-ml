import * as dotenv from 'dotenv';
dotenv.config(); // This loads environment variables from .env file

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Cambiamos el adaptador a Fastify
  const app = await NestFactory.create(AppModule); // Usando Express por defecto
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Solo permite este dominio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas cookies/tokens
  });

  // Habilitar la validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si la solicitud contiene propiedades adicionales no definidas
      transform: true, // Transforma los objetos recibidos en instancias del DTO
    }),
  );

  //this is for api documentation
  const config = new DocumentBuilder()
    .setTitle('Api documentation for backend Machine Learning')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
