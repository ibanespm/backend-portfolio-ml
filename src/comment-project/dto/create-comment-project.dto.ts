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
  @IsNotEmpty() //sure not empty string
  @IsString() // sure is string
  @MinLength(1) // min length
  @MaxLength(500) // max length
  text: string;

  @IsNotEmpty() //sure not empty
  @IsMongoId() // Valida que sea un ID válido de MongoDB
  user: string; // ID del usuario que crea el comentario

  @IsNotEmpty() // Asegura que no esté vacío
  @IsMongoId() // Valida que sea un ID válido de MongoDB
  project: string; // ID del proyecto asociado al comentario

  @IsOptional() // Campo opcional
  @IsNumber() // Valida que sea un número
  likes?: number; // Cantidad inicial de "likes" (por defecto sería 0)
}
