import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdviceModule } from './advice/advice.module';
import { ProjectsModule } from './projects/projects.module';
import { SearchModule } from './search/search.module';
import { ContentModule } from './content/content.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentProjectModule } from './comment-project/comment_project.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    AdviceModule,
    ProjectsModule,
    SearchModule,
    ContentModule,
    MongooseModule.forRoot("mongodb://localhost:27017/tu_base_de_datos"),
    CommentProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
