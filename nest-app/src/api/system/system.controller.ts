import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { Roles } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';

@Roles(AccessLevelEnum.System)
@Controller('system')
export class SystemController {

  @HttpCode(HttpStatus.OK)
  @Get('clients')
  getAll() {
    //return this.authService.signup();
  }

}
