import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    avatar: {type: String, unique: true, minlength: [5, 'Min length for avatar path is 5']},
    email: {
      type: String,
      unique: true,
      match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
      require: true,
    },
    name: {
      type: String,
      require: true,
      minlength: [2, 'Min length for name is 2'],
    },
    password: {
      type: String,
      require: true,
      minlength: [8, 'Min length for password is 8'],
    },
    userType: {type: String, require: true}
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
