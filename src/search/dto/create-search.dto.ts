import { IsString, IsOptional, IsIn } from 'class-validator';

export class SearchDto {
  @IsString()
  term: string; // Término de búsqueda

  @IsOptional()
  @IsIn(['projects', 'content', 'advice'])
  entity?: string; // Entidad sobre la que buscar
}
