import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/main/entities';

@Controller('admin')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
