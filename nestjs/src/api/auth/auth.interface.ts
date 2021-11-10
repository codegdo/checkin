import { CreateContactDto, CreateUserDto } from 'src/models/main/dtos';

export interface ISignup {
  user: CreateUserDto,
  contact: CreateContactDto
}