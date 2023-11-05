import { Controller, Get } from '@nestjs/common';

import {
  RoleType,
  Roles,
  MigrationCategoryPermission,
  Permissions,
} from '@app/common';
import { MigrationCategoryService } from './migration-category.service';

@Roles(RoleType.SYSTEM)
@Controller()
export class MigrationCategoryController {
  constructor(
    private readonly migrationCategoryService: MigrationCategoryService,
  ) { }

  @Get()
  @Permissions(MigrationCategoryPermission.GET_ALL_MIGRATION_CATEGORIES)
  async getAllMigrationCategories() {
    return this.migrationCategoryService.getAllMigrationCategories();
  }
}
