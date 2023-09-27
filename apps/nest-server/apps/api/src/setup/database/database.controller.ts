import { Controller, Get, Param } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller()
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) { }

  @Get('/:databaseName/:operation')
  async performDatabaseOperation(
    @Param('databaseName') databaseName: string,
    @Param('operation') operation: string,
  ) {
    return this.databaseService.performDatabaseOperation(
      databaseName,
      operation,
    );
  }
}
