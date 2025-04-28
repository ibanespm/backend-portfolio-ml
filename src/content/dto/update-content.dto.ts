import { IsString, IsUrl, IsOptional, IsArray } from 'class-validator';

export class UpdateContentDto {
  @IsOptional()
  @IsString()
  title?: string; // Título del contenido

  @IsOptional()
  @IsString()
  type?: string; // Tipo de contenido (video, artículo, dataset)

  @IsOptional()
  @IsUrl()
  url?: string; // URL del contenido (de YouTube, Medium, Kaggle)

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]; // Etiquetas opcionales para clasificar el contenido

  @IsOptional()
  @IsString()
  description?: string; // Descripción opcional del contenido
}
