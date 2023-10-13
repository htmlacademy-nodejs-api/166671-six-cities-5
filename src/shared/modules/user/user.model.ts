import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    avatar: String,
    email: { type: String, unique: true },
    name: String,
    password: String,
    userType: String,
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
