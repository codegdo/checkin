import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Access } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';

@Access(AccessLevelEnum.System)
@Controller('monitor')
export class MonitorController {

  @HttpCode(HttpStatus.OK)
  @Get('clients')
  getAllClient() {
    //return this.authService.signup();
  }
}
