import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type AdviceDocument = Advice & Document;

@Schema({ timestamps: true })
export class Advice {
  @Prop({ required: true })
  topic: string; // Tema de la asesoría

  @Prop({ required: true })
  description: string; // Descripción de la solicitud

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requester: User; // Usuario que solicita la asesoría

  @Prop({ type: Types.ObjectId, ref: 'User' })
  advisor?: User; // Usuario que brinda la asesoría

  @Prop({ default: 'pending', enum: ['pending', 'in-progress', 'completed'] })
  status: string; // Estado de la asesoría
}

export const AdviceSchema = SchemaFactory.createForClass(Advice);
AdviceSchema.index(
  { topic: 1, description: 1, requester: 1 },
  { unique: true },
);
