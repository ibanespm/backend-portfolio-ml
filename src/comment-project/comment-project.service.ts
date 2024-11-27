import { Injectable } from '@nestjs/common';
import { CreateCommentProjectDto } from './dto/create-comment-project.dto';
import { UpdateCommentProjectDto } from './dto/update-comment-project.dto';

@Injectable()
export class CommentProjectService {
  create(createCommentProjectDto: CreateCommentProjectDto) {
    return 'This action adds a new commentProject';
  }

  findAll() {
    return `This action returns all commentProject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentProject`;
  }

  update(id: number, updateCommentProjectDto: UpdateCommentProjectDto) {
    return `This action updates a #${id} commentProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentProject`;
  }
}
