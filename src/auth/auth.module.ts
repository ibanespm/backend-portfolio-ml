import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guards/jwt.constant';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { PassportModule } from '@nestjs/passport'; // Asegúrate de importar PassportModule
import { JwtStrategy } from './guards/auth.strategy';
import { GoogleStrategy } from './guards/google-oauth.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './guards/auth.guard';

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
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, JwtAuthGuard],
})
export class AuthModule {}
