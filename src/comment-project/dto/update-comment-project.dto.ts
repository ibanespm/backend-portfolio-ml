import {
  IsOptional,
  IsString,
  IsMongoId,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class UpdateCommentDto {
  @IsOptional() // Campo opcional
  @IsString() // Debe ser una cadena de texto
  @MinLength(1) // Longitud mínima
  @MaxLength(500) // Longitud máxima
  text?: string; // Texto del comentario

  @IsOptional() // Campo opcional
  @IsMongoId() // Debe ser un ID válido de MongoDB
  user?: string; // ID del usuario (opcional en caso de actualizar este campo)

  @IsOptional() // Campo opcional
  @IsMongoId() // Debe ser un ID válido de MongoDB
  project?: string; // ID del proyecto asociado (opcional)

  @IsOptional() // Campo opcional
  @IsNumber() // Valida que sea un número
  likes?: number; // Cantidad de "likes" (opcional)
}
