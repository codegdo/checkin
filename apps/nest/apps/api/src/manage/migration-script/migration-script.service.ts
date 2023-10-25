import {
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MigrationScriptService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async getAllMigrationCategories() {
    try {
      //return this.migrationRepository.getAllMigrations();
    } catch (error) {
      this.logger.error('ERROR', error, MigrationScriptService.name);
      throw new UnauthorizedException();
    }
  }
}
