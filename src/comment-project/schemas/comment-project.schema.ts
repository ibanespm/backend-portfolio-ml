import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'src/projects/schemas/projects.schema';
import { User } from 'src/users/schemas/users.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  text: string; // Texto del comentario

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User; // Usuario que realizó el comentario

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Project; // Proyecto asociado al comentario

  @Prop({ default: 0 })
  likes: number; // Cantidad de "likes" en el comentario
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
