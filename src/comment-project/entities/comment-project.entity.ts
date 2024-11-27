import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'src/projects/schemas/projects.schema';
import { User } from 'src/users/schemas/users.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  text: string; // The comment text

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  user?: User; // Reference to the user who made the comment (optional)

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Project; // Reference to the associated project

  @Prop({ default: 0 })
  likes: number; // Number of likes for the comment
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
