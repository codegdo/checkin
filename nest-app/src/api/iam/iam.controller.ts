import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, PermissionGuard, RoleGuard } from 'src/guards';

@Controller('iam')
export class IamController {
  @HttpCode(HttpStatus.OK)
  @Post('users')
  signup() {
    //return this.authService.signup();
  }
}
