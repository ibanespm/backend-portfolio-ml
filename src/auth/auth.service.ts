import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserDocument } from '../users/schemas/users.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password, email, role } = userObject;

    // Verificar si el email ya existe en la base de datos
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

    user.password = undefined;

    return user;
  }

  @Post('login')
  async login(@Body() userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;

    const userFind = await this.userModel.findOne({ email: email });

    if (!userFind)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, userFind.password);

    if (!checkPassword) throw new HttpException('PASSWORD_NOT_MATCH', 401);

    return userFind;

    //payload
    // const payload = {
    //   sub: userFind._id,
    //   email: userFind.email,
    //   name: userFind.name,
    // };

    // //jwt
    // const jwtToken = await this.jwtService.signAsync(payload);

    // const data = { access_token: jwtToken, user: userFind };

    // return data;
  }
}
