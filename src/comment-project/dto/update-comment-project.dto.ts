import { PartialType } from '@nestjs/swagger';
import { CreateCommentProjectDto } from './create-comment-project.dto';

export class UpdateCommentProjectDto extends PartialType(CreateCommentProjectDto) {}
