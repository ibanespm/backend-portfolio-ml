import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guards/jwt.constant';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/users.schema';
import { PassportModule } from '@nestjs/passport'; 
import { JwtStrategy } from './guards/auth.strategy';
import { GoogleStrategy } from './guards/google-oauth.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './guards/auth.guard';
import googleOauthConfig from './guards/google-oauth.config';
import { UsersService } from '../users/users.service';

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
      signOptions: jwtConstants.signOptions,
    }),
    UsersModule,
    PassportModule,
    ConfigModule,
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    UsersService,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
