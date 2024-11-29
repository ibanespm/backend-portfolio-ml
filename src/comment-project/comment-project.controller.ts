import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentProjectService } from './comment-project.service';
import { CreateCommentDto } from './dto/create-comment-project.dto';
import { UpdateCommentDto } from './dto/update-comment-project.dto';

@Controller('comment-project')
export class CommentProjectController {
  constructor(private readonly commentProjectService: CommentProjectService) {}

  @Post()
  create(@Body() createCommentProjectDto: CreateCommentDto) {
    return this.commentProjectService.create(createCommentProjectDto);
  }

  @Get()
  findAll() {
    return this.commentProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentProjectService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentProjectDto: UpdateCommentDto,
  ) {
    return this.commentProjectService.update(id, updateCommentProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentProjectService.remove(id);
  }
}
