import { IsString, IsUrl, IsOptional } from 'class-validator';

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
  @IsString()
  description?: string; // Descripción opcional del contenido
}
