import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, minlength: [5, 'Min length for avatar path is 5'] })
  public avatar: string | undefined;

  @prop({
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  })
  public email: string;

  @prop({ required: true, minlength: [2, 'Min length for name is 2'] })
  public name: string;

  @prop({ required: true, minlength: [8, 'Min length for password is 8'] })
  public password: string;

  @prop({ required: true })
  public userType: UserType;
}

export const UserModel = getModelForClass(UserEntity);
