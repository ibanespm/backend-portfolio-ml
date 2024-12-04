import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;
@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true })
  title: string; // Título del contenido

  @Prop({ required: true })
  type: string; // Tipo de contenido (video, artículo, dataset)

  @Prop({ required: true })
  url: string; // URL del contenido (en YouTube, Medium, Kaggle)

  @Prop({ default: '' })
  description: string; // Descripción opcional del contenido

  @Prop({ default: 0 })
  likes: number; // Likes o valoraciones en el contenido
}

export const ContentSchema = SchemaFactory.createForClass(Content);
