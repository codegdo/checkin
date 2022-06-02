import { Controller, Get, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('setup')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get('users/:userId')
  getUser(@Session() session: any) {
    session.data = { test: 'ok' }
    return this.userService.getUser();
  }
}
