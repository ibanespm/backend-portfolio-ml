import { CreateUserDto } from './dto/create-user.dto';
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
    const userFind = await this.userModel.findById(id).exec();
    // Si no se encuentra el usuario, lanza una excepción de "No encontrado"
    if (!userFind) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return userFind;
  }

  // Create a new user
  async create(CreateUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    const newUser = new this.userModel({
      ...CreateUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }
  //find user by email
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
  // Update user details
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      // Check if the ID is valid
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
      // Update user in the database
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .select('-password') // Exclude password from the response
        .exec();
      // Throw an exception if the user does not exist
      if (!updatedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      // Handle unexpected errors
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid ObjectId');
      }
      throw error;
    }
  }

  // Change user password
  async updatePassword(id: string, newPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userModel
      .findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<{ message: string; status: number }> {
    // search and deleted user
    const userDeleted = await this.userModel.findByIdAndDelete(id).exec();

    // verify if user exists and lauch exception
    if (!userDeleted) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Response the user deleted and status
    return {
      message: 'User deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
