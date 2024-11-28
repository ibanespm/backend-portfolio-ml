import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateProjectDto {
  //name of the project
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  //Url of the project
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  //Url of the dockerhub for pull
  @IsUrl()
  @IsNotEmpty()
  dockerHubUrl: string;
  //url of github for see code of  project
  @IsUrl()
  @IsNotEmpty()
  githubUrl: string;
  //owner of project
  @IsString()
  @IsNotEmpty()
  owner: string;
  //an users to having the project
  @IsArray()
  @IsOptional()
  comments?: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true }) // Valida que cada elemento del arreglo sea una cadena
  tags?: string[];
}
