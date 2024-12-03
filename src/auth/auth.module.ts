import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constant';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { PassportModule } from '@nestjs/passport'; // Asegúrate de importar PassportModule
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60h' },
    }),
    UsersModule,
    PassportModule, // Importar PassportModule para la autenticación
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Registrar JwtStrategy aquí
})
export class AuthModule {}
