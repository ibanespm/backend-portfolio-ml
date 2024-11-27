import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // Password should have a reasonable length limit
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100) // Name should not exceed 100 characters
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18) // Minimum age of 18
  @Max(100) // Maximum age of 100
  age: number;

  @IsString()
  @IsOptional() // Optional role, defaults to 'user'
  role?: 'admin' | 'user';
}
