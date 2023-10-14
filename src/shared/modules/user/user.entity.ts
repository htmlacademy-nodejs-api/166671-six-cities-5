import { User, UserType } from '../../types/index.js';

export class UserEntity implements User {
  public avatar: string | undefined;
  public email: string;
  public name: string;
  public password: string;
  public userType: UserType;
}
