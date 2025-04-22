import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false }) // Opcional para cuentas Google
  password?: string;

  @Prop({ default: 'user', enum: ['admin', 'user'] })
  role: string;

  @Prop({ default: false })
  isGoogleAccount: boolean;

  @Prop()
  googleId?: string;

  @Prop({ default: 'local' })
  provider: string;

  @Prop()
  picture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
