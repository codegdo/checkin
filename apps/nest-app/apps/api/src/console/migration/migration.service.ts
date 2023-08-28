import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class MigrationService {

  async executeSqlFile(filePath: string): Promise<void> {
    //const queryRunner = this.connection.createQueryRunner();
    //await queryRunner.connect();

    try {
      const sql = await this.readFile(filePath);
      console.log(sql);
      //await queryRunner.query(sql);
    } catch (error) {
      throw error;
    } finally {
      //await queryRunner.release();
    }
  }

  private async readFile(filePath: string): Promise<string> {
    return fs.promises.readFile(filePath, 'utf8');
  }
}
