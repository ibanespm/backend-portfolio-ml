import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Project, ProjectSchema } from '../projects/schemas/projects.schema';
import { ContentSchema } from '../content/schemas/content.schema';
import { Advice, AdviceSchema } from '../advice/schemas/advice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: 'Content', schema: ContentSchema },
      { name: Advice.name, schema: AdviceSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
