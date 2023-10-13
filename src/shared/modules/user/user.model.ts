import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  avatar: String,
  email: String,
  name: String,
  password: String,
  userType: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
