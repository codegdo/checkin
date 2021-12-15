import { Exclude, Expose } from 'class-transformer';
import { serialize } from 'v8';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  emailAddress: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  roleId: number;

  @Expose()
  roleType: string;

  @Expose()
  orgId: number;

  @Expose()
  orgActive: boolean;

  @Expose()
  isActive: boolean;

  @Expose()
  isOwner: boolean;
}