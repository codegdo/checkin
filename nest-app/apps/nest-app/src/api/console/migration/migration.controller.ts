import { Controller, Get, Req, Session } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { Auth } from 'src/decorators';
import { AuthType } from 'src/constants';
import { SESSION_DATA_KEY } from 'src/interfaces';

@Auth(AuthType.None)
@Controller()
export class MigrationController {
  constructor(
    private readonly migrationService: MigrationService
  ) { }

  @Get('up')
  async migrationUp(@Req() req: any, @Session() session) {
    await this.migrationService.migrationUp();
    session[SESSION_DATA_KEY] = {sid: session.id, userId: 1 };
    console.log(req);
    return {ok: true};
  }

  @Get('down')
  async migrationDown(@Session() session) {
    await this.migrationService.migrationDown();
    session.destroy();
    return {ok: true};
  }
}
