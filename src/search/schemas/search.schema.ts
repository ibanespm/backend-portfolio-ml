import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SearchDocument = Search & Document;

@Schema({ timestamps: true })
export class Search {
  @Prop({ required: true })
  query: string; // Término buscado

  @Prop({ type: [String], default: [] })
  results: string[]; // IDs de los documentos encontrados

  @Prop({ required: true })
  type: string; // Tipo de búsqueda: 'project', 'content', etc.
}

export const SearchSchema = SchemaFactory.createForClass(Search);
