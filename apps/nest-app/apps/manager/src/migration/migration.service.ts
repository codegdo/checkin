import { Injectable } from '@nestjs/common';

@Injectable()
export class MigrationService {
  constructor(
    private dataSource: DataSource,
  ) { }

  async runSeeding(): Promise<void> {

  }
}
