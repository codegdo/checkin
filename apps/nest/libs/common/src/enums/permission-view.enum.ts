export enum MigrationPermission {
  ASSIGN_SCRIPTS_FOR_MIGRATION = 'database:migration:assignScriptsToMigration',
  GET_ALL_MIGRATIONS = 'database:migration:getAllMigrations',
  GET_MIGRATION_BY_ID = 'database:migration:getMigrationById',
  GET_SCRIPTS_FOR_MIGRATION = 'database:migration:getScriptsForMigration',
  GET_ROLLBACKS_FOR_MIGRATION = 'database:migration:getRollbacksForMigration',
  CREATE_NEW_MIGRATION = 'database:migration:createNewMigration',
  MIGRATION_RUN_BY_ID = 'database:migration:migrationRunById',
  MIGRATION_ROLLBACK_BY_ID = 'database:migration:migrationRollbackById',
}

export enum MigrationCategoryPermission {
  GET_ALL_MIGRATION_CATEGORIES = 'database:migration_category:getAllMigrationCategories',
  GET_MIGRATION_CATEGORY_BY_ID = 'database:migration_category:getMigrationCategoryById',
  CREATE_NEW_MIGRATION_CATEGORY = 'database:migration_category:createNewMigrationCategory',
}

export enum MigrationScriptPermission {
  GET_ALL_MIGRATION_SCRIPTS = 'database:migration_script:getAllMigrationScripts',
  GET_MIGRATION_SCRIPT_BY_ID = 'database:migration_script:getMigrationScriptById',
  CREATE_NEW_MIGRATION_SCRIPT = 'database:migration_script:createNewMigrationScript',
}
