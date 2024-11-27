import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument, User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Retrieve all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Retrieve a user by ID

  async findById(id: string): Promise<User> {
    // Verifica si el id es un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId format');
    }

    // Realiza la consulta si el id es válido
    const user = await this.userModel.findById(id).exec();

    // Si no se encuentra el usuario, lanza una excepción de "No encontrado"
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  // Update user details
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  // Change user password
  async updatePassword(id: string, newPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userModel
      .findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
      .exec();
  }

  // Update user status
  async updateStatus(id: string, status: 'active' | 'inactive'): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<{ message: string; status: number }> {
    // Buscar y eliminar el usuario
    const userDeleted = await this.userModel.findByIdAndDelete(id).exec();

    // Si no se encuentra el usuario, lanzar una excepción
    if (!userDeleted) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Responder con un mensaje y un código de estado
    return {
      message: 'User deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
