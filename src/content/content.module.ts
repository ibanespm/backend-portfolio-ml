import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import {
  ContentController,
  ContentFiltersController,
} from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './schemas/content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]), // Use Content.name instead of Content.title
  ],
  controllers: [ContentController, ContentFiltersController],
  providers: [ContentService],
})
export class ContentModule {}
