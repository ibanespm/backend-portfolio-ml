import { Module } from '@nestjs/common';
import { CommentProjectService } from './comment-project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment-project.schema';
import { CommentProjectController } from './comment-project.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'CommentProject',
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [CommentProjectController],
  providers: [CommentProjectService],
})
export class CommentProjectModule {}
