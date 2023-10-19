import { Controller, Get } from '@nestjs/common';

@Controller('migration-category')
export class MigrationCategoryController {
  @Get('migration-categories')
  async getAllMigrationCategories() {
    return 'getAllMigrationCategories';
  }
}
