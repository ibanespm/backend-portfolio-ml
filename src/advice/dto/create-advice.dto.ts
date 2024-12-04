import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Types } from 'mongoose';

//Enumerate posible status
export enum adviceStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}
export class CreateAdviceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  topic: string;

  @IsString()
  @MinLength(10)
  description?: string;

  @IsNotEmpty()
  @IsOptional()
  requester: Types.ObjectId;

  @IsEnum(adviceStatus)
  status: adviceStatus;
}
