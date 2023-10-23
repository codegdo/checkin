import { Controller, Get } from '@nestjs/common';

@Controller()
export class MigrationCategoryController {
  @Get()
  async getAllMigrationCategories() {
    return 'getAllMigrationCategories';
  }
}
