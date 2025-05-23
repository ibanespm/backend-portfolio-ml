import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'projects/schemas/projects.schema';
import { User } from 'users/schemas/users.schema';

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

  @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
  parentCommentId: Comment | null; // Referencia al comentario padre (si es una respuesta)

  @Prop({ type: [String], default: [] })
  likedBy: string[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
