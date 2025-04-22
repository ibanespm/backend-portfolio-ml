import {
 IsOptional,
 IsString
} from 'class-validator'


export class FilterContentDto {
    @IsOptional()
    @IsString()
    category?: string;
  
    @IsOptional()
    @IsString()
    type?: string;
  }
  