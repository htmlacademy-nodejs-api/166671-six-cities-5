import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    validate: {
      validator: (v: string | undefined) => v && v.length >= 5,
      message: 'Min length for avatar path is 5',
    },
  })
  public avatar?: string;

  @prop({
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i,
      'Email is incorrect',
    ],
    required: true,
  })
  public email: string;

  @prop({ required: true, minlength: [2, 'Min length for name is 2'] })
  public name: string;

  @prop({ required: true, minlength: [8, 'Min length for password is 8'] })
  public password: string;

  @prop({ required: true, type: () => String, enum: UserType })
  public userType: UserType;

  constructor(userData: User) {
    super();

    this.avatar = userData?.avatar;
    this.email = userData.email;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
