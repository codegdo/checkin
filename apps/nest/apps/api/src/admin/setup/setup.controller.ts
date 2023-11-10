import { Controller, Get, Param } from '@nestjs/common';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) { }

  @Get('/:databaseName/:operation')
  async performDatabaseOperation(
    @Param('databaseName') databaseName: string,
    @Param('operation') operation: string,
  ) {
    return this.setupService.performDatabaseOperation(databaseName, operation);
  }
}
