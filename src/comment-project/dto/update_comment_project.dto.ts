import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

export class LikeCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string; // ID del usuario que da like o quita el like
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string; // Texto nuevo del comentario
}
