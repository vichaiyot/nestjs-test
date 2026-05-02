import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Country',
    required: true,
  })
  country!: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
