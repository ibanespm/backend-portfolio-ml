import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private readonly contentModel: Model<ContentDocument>,
  ) {}

  // Crear un nuevo contenido
  async create(createContentDto: CreateContentDto): Promise<Content> {
    const newContent = new this.contentModel(createContentDto);
    return newContent.save();
  }

  // Obtener todos los contenidos
  async findAll(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }

  // Obtener un contenido por su ID
  async findOne(id: string): Promise<Content> {
    return this.contentModel.findById(id).exec();
  }

  // Actualizar un contenido por su ID
  async update(
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    return this.contentModel
      .findByIdAndUpdate(id, updateContentDto, { new: true })
      .exec();
  }

  // Eliminar un contenido por su ID
  async remove(id: string): Promise<void> {
    await this.contentModel.findByIdAndDelete(id).exec();
  }
}
