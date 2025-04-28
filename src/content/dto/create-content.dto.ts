import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string; // Título del contenido

  @IsString()
  type: string; // Tipo de contenido (video, artículo, dataset)

  @IsUrl()
  @IsNotEmpty() // URL should be provided by the user
  @MinLength(10) // Minimum length for URL to be considered valid
  url: string; // URL del contenido (de YouTube, Medium, Kaggle)

  @IsOptional()
  @IsString()
  description?: string; // Descripción opcional del contenido

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsString()
  category?: string;
}
