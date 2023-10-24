import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public avatar?: string;
  public email: string;
  public name: string;
  public password: string;
  public userType: UserType;
}
