import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public avatar: string | undefined;
  public email: string;
  public name: string;
  public password: string;
  public userType: UserType;
}
