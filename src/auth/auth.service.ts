import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User, UserDocument } from '../users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password, email, role } = userObject;

    const userExist = await this.userModel.findOne({ email });
    if (userExist) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }
    if (!['user', 'admin'].includes(role)) {
      throw new HttpException('INVALID_ROLE', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(password, 10);
    const userToCreate = { ...userObject, password: hashedPassword };
    const user = await this.userModel.create(userToCreate);
    return user;
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;
    const userFind = await this.userModel.findOne({ email });
    if (!userFind) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(password, userFind.password || '');
    if (!checkPassword) {
      throw new HttpException('PASSWORD_NOT_MATCH', HttpStatus.UNAUTHORIZED);
    }

    return this.generateAuthResponse(userFind);
  }

  async validateOAuthUser(userData: {
    email: string;
    name: string;
    googleId: string;
    picture?: string;
  }) {
    const { email, name, picture, googleId } = userData;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      if (!existingUser.isGoogleAccount) {
        existingUser.isGoogleAccount = true;
        existingUser.googleId = googleId;
        existingUser.picture = picture;
        existingUser.provider = 'google';
        await existingUser.save();
      }
      return existingUser;
    }

    const newUser = await this.userModel.create({
      email,
      name,
      role: 'user',
      isGoogleAccount: true,
      googleId,
      picture,
      provider: 'google',
    });

    return newUser;
  }

  async generateAuthResponse(user: UserDocument) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const jwtToken = await this.jwtService.signAsync(payload);

    return {
      access_token: jwtToken,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isGoogleAccount: user.isGoogleAccount,
        picture: user.picture,
        provider: user.provider,
      },
    };
  }
}
