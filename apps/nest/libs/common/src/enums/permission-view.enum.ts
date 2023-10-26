export enum MigrationPermission {
  ASSIGN_SCRIPTS_FOR_MIGRATION = 'manage:migration:assignScriptsToMigration',
  GET_ALL_MIGRATIONS = 'manage:migration:getAllMigrations',
  GET_MIGRATION_BY_ID = 'manage:migration:getMigrationById',
  GET_SCRIPTS_FOR_MIGRATION = 'manage:migration:getScriptsForMigration',
  GET_ROLLBACKS_FOR_MIGRATION = 'manage:migration:getRollbacksForMigration',
  CREATE_NEW_MIGRATION = 'manage:migration:createNewMigration',
  MIGRATION_RUN_BY_ID = 'manage:migration:migrationRunById',
  MIGRATION_ROLLBACK_BY_ID = 'manage:migration:migrationRollbackById',
}

export enum MigrationCategoryPermission {
  GET_ALL_MIGRATION_CATEGORIES = 'manage:migration_category:getAllMigrationCategories',
  GET_MIGRATION_CATEGORY_BY_ID = 'manage:migration_category:getMigrationCategoryById',
  CREATE_NEW_MIGRATION_CATEGORY = 'manage:migration_category:createNewMigrationCategory',
}

export enum MigrationScriptPermission {
  GET_ALL_MIGRATION_SCRIPTS = 'manage:migration_script:getAllMigrationScripts',
  GET_MIGRATION_SCRIPT_BY_ID = 'manage:migration_script:getMigrationScriptById',
  CREATE_NEW_MIGRATION_SCRIPT = 'manage:migration_script:createNewMigrationScript',
}
