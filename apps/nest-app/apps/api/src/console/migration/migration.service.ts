import * as fs from 'fs';
import * as path from 'path';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import { MANAGER_SERVICE } from '@app/common';

@Injectable()
export class MigrationService {
  constructor(
    private dataSource: DataSource,

    @Inject(MANAGER_SERVICE)
    private readonly migrationService: ClientProxy
  ) { }

  async executeSqlFiles(files: any[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      for (const file of files) {
        const migrationFilePath = path.join(__dirname, '../../', file.path);
        const sql = await this.readFile(migrationFilePath);
        await queryRunner.query(sql);
      }
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async readFile(filePath: string): Promise<string> {
    return fs.promises.readFile(filePath, 'utf8');
  }
}
