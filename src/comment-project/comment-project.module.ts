import { Module } from '@nestjs/common';
import { CommentProjectService } from './comment-project.service';
import { CommentProjectController } from './comment-project.controller';

@Module({
  controllers: [CommentProjectController],
  providers: [CommentProjectService],
})
export class CommentProjectModule {}
