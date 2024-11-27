import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class Content {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['article', 'video'] })
  type: string; // 'article' or 'video'

  @Prop({ required: true })
  description: string;

  @Prop()
  url: string; // URL for video or article

  @Prop({ type: [String], default: [] })
  tags: string[]; // Tags for categorization

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
