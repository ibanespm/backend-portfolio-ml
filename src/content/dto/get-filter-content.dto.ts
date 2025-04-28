import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterContentDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',');
    return [value];
  })
  tags?: string[];
}
