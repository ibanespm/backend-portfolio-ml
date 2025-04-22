import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../projects/schemas/projects.schema';
import { Content } from '../content/schemas/content.schema';
import { Advice } from '../advice/schemas/advice.schema';
import { SearchDto } from './dto/create-search.dto';
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    @InjectModel('Content') private readonly contentModel: Model<Content>,
    @InjectModel(Advice.name) private readonly adviceModel: Model<Advice>,
  ) {}

  async search(searchDto: SearchDto) {
    const { term, entity } = searchDto;

    if (!term) {
      throw new BadRequestException('Search term is required');
    }

    switch (entity) {
      case 'projects':
        return this.projectModel
          .find({ title: { $regex: term, $options: 'i' } })
          .exec();
      case 'content':
        return this.contentModel
          .find({ title: { $regex: term, $options: 'i' } })
          .exec();
      case 'advice':
        return this.adviceModel
          .find({ topic: { $regex: term, $options: 'i' } })
          .exec();
      default:
        return {
          projects: await this.projectModel
            .find({ title: { $regex: term, $options: 'i' } })
            .exec(),
          content: await this.contentModel
            .find({ title: { $regex: term, $options: 'i' } })
            .exec(),
          advice: await this.adviceModel
            .find({ topic: { $regex: term, $options: 'i' } })
            .exec(),
        };
    }
  }
}
