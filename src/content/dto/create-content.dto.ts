import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEnum(['article', 'video'])
  @IsNotEmpty()
  type: 'article' | 'video';

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  description: string;

  @IsString()
  @IsOptional()
  url?: string; // Optional, as some articles may not have URLs

  @IsString({ each: true }) // Ensures every tag in the array is a string
  @IsOptional()
  tags?: string[];
}
