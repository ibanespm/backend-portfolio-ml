import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ required: false, default: 'General' })
  category: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
