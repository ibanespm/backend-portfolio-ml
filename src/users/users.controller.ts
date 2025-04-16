import { Controller, Get, Body, Patch, Param, Delete, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieve all users (Admin only)
   * @returns List of users
   */
  @Get()
  async findAll() {
    const findAllUsers = await this.usersService.findAll();
    return findAllUsers; // Devuelve la lista de usuarios sin el campo 'password'
  }

  /**
   * Retrieve a user by ID
   * @param id User ID
   * @returns User details
   */
  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.usersService.findById(_id);
  }

  /**
   * Created user (Admin only)
   * @param createUserDto User data to create
   * @returns Created user
   */
  @Post() 
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Update user details
   * @param id User ID
   * @param updateUserDto
   * @returns Updated user
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Change user password
   * @param id User ID
   * @param password New password
   * @returns Updated user with hashed password
   */
  @Patch(':id/password')
  updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.usersService.updatePassword(id, password);
  }

  /**
   * Delete a user by ID (Admin only)
   * @param id User ID
   * @returns Deleted user
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
