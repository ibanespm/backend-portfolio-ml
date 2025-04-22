import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentProjectService } from './comment_project.service';
import { CommentProjectController } from './comment_project.controller';
import { CommentSchema } from './schemas/comment_project.schema';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module'; // Importamos el UserModule
import { Project, ProjectSchema } from 'src/projects/schemas/projects.schema';
import { User, UserSchema } from 'src/users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CommentProject', schema: CommentSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ProjectsModule,
    UsersModule,
  ],
  providers: [CommentProjectService],
  controllers: [CommentProjectController],
})
export class CommentProjectModule {}
