import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommentProjectService } from './comment_project.service';
import { CreateCommentDto } from './dto/create_comment_project.dto';
import {
  LikeCommentDto,
  UpdateCommentDto,
} from './dto/update_comment_project.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { UserDecorator } from './decorators/user.decorators';
// import { UpdateCommentDto } from './dto/update-comment-project.dto';

@Controller('commentProject')
export class CommentProjectController {
  constructor(private readonly commentProjectService: CommentProjectService) {}

  @Post()
  create(@Body() createCommentProjectDto: CreateCommentDto) {
    return this.commentProjectService.create(createCommentProjectDto);
  }

  @Get(':projectId/comments')
  async findCommentsByProject(@Param('projectId') projectId: string) {
    return this.commentProjectService.findByProject(projectId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentProjectService.findOne(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editComment(
    @Param('id') commentId: string,
    @Body() updateCommentDt: UpdateCommentDto,
    @UserDecorator() user: { userId: string },
  ) {
    return this.commentProjectService.editComment(
      commentId,
      user.userId,
      updateCommentDt,
    );
  }

  @Patch(':id/like')
  async toggleLike(
    @Param('id') commentId: string,
    @Body() likeCommentDto: LikeCommentDto,
  ) {
    return this.commentProjectService.toggleLike(
      commentId,
      likeCommentDto.userId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentProjectService.remove(id);
  }
}
