import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Roles } from 'src/decorators';
import { AccessLevelEnum } from 'src/models/main';

@Roles(AccessLevelEnum.Internal)
@Controller('iam')
export class IamController {
  @HttpCode(HttpStatus.OK)
  @Get('users')
  getAll() {
    //return this.authService.signup();
  }
}
