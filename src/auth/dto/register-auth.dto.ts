import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { PartialType } from '@nestjs/mapped-types';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @MaxLength(100) // Limit name length to 100 characters
  name: string;

  @IsString()
  @IsOptional()
  role?: 'admin' | 'user'; // Optional, defaults to 'user'
}
