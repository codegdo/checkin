import { Controller, Get } from '@nestjs/common';

import { RoleType, Roles, Permissions } from '../../../common';
import { MigrationCategoryService } from './migration-category.service';
import { MigrationCategoryAction } from './migration-category.action';

@Roles(RoleType.SYSTEM)
@Controller()
export class MigrationCategoryController {
  constructor(
    private readonly migrationCategoryService: MigrationCategoryService,
  ) { }

  @Get('migration-categories')
  @Permissions(MigrationCategoryAction.GET_ALL_MIGRATION_CATEGORIES)
  async getAllMigrationCategories() {
    return this.migrationCategoryService.getAllMigrationCategories();
  }
}
