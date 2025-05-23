import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserDocument } from '../users/schemas/users.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private UsersService: UsersService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password, email, role } = userObject;
    const userExist = await this.userModel.findOne({ email });

    if (userExist)
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);

    if (!['user', 'admin'].includes(role))
      throw new HttpException('INVALID_ROLE', HttpStatus.BAD_REQUEST);

    const hashedPassword = await hash(password, 10);
    const userToCreate = {
      ...userObject,
      password: hashedPassword,
      provider: 'local',
      isGoogleAccount: false,
    };
    return await this.userModel.create(userToCreate);
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('USER_NOT_FOUND');

    // Validar que no sea cuenta Google
    if (user.isGoogleAccount) {
      throw new UnauthorizedException('USE_GOOGLE_LOGIN');
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('PASSWORD_INVALID');

    return this.generateTokens(user);
  }
  async handleGoogleAuth(googleUser: {
    email: string;
    name: string;
    picture?: string;
    googleId: string;
  }) {
    // Buscar usuario por email o googleId
    let user = await this.userModel.findOne({
      $or: [{ email: googleUser.email }, { googleId: googleUser.googleId }],
    });

    // Crear usuario si no existe
    if (!user) {
      user = await this.userModel.create({
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        googleId: googleUser.googleId,
        isGoogleAccount: true,
        provider: 'google',
        role: 'user', // Rol por defecto
      });
    } else if (!user.isGoogleAccount) {
      // Si el usuario existe pero no es cuenta Google
      throw new UnauthorizedException('EMAIL_EXISTS_WITH_OTHER_METHOD');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: UserDocument) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: user.role,
        provider: user.provider,
      },
    };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.UsersService.findByEmail(googleUser.email);

    if (user) return user;
    return await this.UsersService.create(googleUser);
  }
  async validateUser(email: string, password: string) {
    const user = await this.UsersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return { user };
  }
}
