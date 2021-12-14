import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  emailAddress: string;

  @IsString()
  phoneNumber: string;
}