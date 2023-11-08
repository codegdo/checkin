export enum MigrationPermission {
  // migration
  ASSIGN_SCRIPTS_FOR_MIGRATION = 'database:migrations:assignScriptsToMigration',
  GET_ALL_MIGRATIONS = 'database:migrations:getAllMigrations',
  GET_MIGRATION_BY_ID = 'database:migrations:getMigrationById',
  GET_SCRIPTS_FOR_MIGRATION = 'database:migrations:getScriptsForMigration',
  GET_ROLLBACKS_FOR_MIGRATION = 'database:migrations:getRollbacksForMigration',
  CREATE_NEW_MIGRATION = 'database:migrations:createNewMigration',
  MIGRATION_RUN_BY_ID = 'database:migrations:migrationRunById',
  MIGRATION_ROLLBACK_BY_ID = 'database:migrations:migrationRollbackById',
  // migration_category
  GET_ALL_MIGRATION_CATEGORIES = 'database:migrations:getAllMigrationCategories',
  GET_MIGRATION_CATEGORY_BY_ID = 'database:migrations:getMigrationCategoryById',
  CREATE_NEW_MIGRATION_CATEGORY = 'database:migrations:createNewMigrationCategory',
  // migration_script
  GET_ALL_MIGRATION_SCRIPTS = 'database:migrations:getAllMigrationScripts',
  GET_MIGRATION_SCRIPT_BY_ID = 'database:migrations:getMigrationScriptById',
  CREATE_NEW_MIGRATION_SCRIPT = 'database:migrations:createNewMigrationScript',
}