import {
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MigrationCategoryService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) { }

  async getAllMigrationCategories() {
    try {
      //return this.migrationRepository.getAllMigrations();
      return 'getAllMigrationCategories';
    } catch (error) {
      this.logger.error('ERROR', error, MigrationCategoryService.name);
      throw new UnauthorizedException();
    }
  }
}
