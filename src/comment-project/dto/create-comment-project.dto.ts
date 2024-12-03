import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text: string; // Texto del comentario

  @IsNotEmpty()
  @IsMongoId()
  user: string; // ID del usuario que crea el comentario

  @IsNotEmpty()
  @IsMongoId()
  project: string; // ID del proyecto asociado al comentario

  @IsOptional()
  @IsNumber()
  likes?: number; // Cantidad inicial de "likes" (por defecto sería 0)

  @IsOptional()
  @IsMongoId()
  parentComment?: string; // ID del comentario "padre" (si es una respuesta)
}
