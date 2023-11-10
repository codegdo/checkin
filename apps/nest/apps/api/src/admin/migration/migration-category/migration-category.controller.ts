import { Controller, Get } from '@nestjs/common';

import { RoleType, Roles, MigrationPermission, Permissions } from '@app/common';
import { MigrationCategoryService } from './migration-category.service';

@Roles(RoleType.SYSTEM)
@Controller()
export class MigrationCategoryController {
  constructor(
    private readonly migrationCategoryService: MigrationCategoryService,
  ) { }

  @Get('migration-categories')
  @Permissions(MigrationPermission.GET_ALL_MIGRATION_CATEGORIES)
  async getAllMigrationCategories() {
    return this.migrationCategoryService.getAllMigrationCategories();
  }
}
