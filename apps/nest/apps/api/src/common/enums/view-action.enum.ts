export enum MigrationAction {
  // migration
  ASSIGN_SCRIPTS_FOR_MIGRATION = 'admin:migrations:assignScriptsToMigration',
  GET_ALL_MIGRATIONS = 'admin:migrations:getAllMigrations',
  GET_MIGRATION_BY_ID = 'admin:migrations:getMigrationById',
  GET_SCRIPTS_FOR_MIGRATION = 'admin:migrations:getScriptsForMigration',
  GET_ROLLBACKS_FOR_MIGRATION = 'admin:migrations:getRollbacksForMigration',
  CREATE_NEW_MIGRATION = 'admin:migrations:createNewMigration',
  MIGRATION_RUN_BY_ID = 'admin:migrations:migrationRunById',
  MIGRATION_ROLLBACK_BY_ID = 'admin:migrations:migrationRollbackById',
  // migration_category
  GET_ALL_MIGRATION_CATEGORIES = 'admin:migrations:getAllMigrationCategories',
  GET_MIGRATION_CATEGORY_BY_ID = 'admin:migrations:getMigrationCategoryById',
  CREATE_NEW_MIGRATION_CATEGORY = 'admin:migrations:createNewMigrationCategory',
  // migration_script
  GET_ALL_MIGRATION_SCRIPTS = 'admin:migrations:getAllMigrationScripts',
  GET_MIGRATION_SCRIPT_BY_ID = 'admin:migrations:getMigrationScriptById',
  CREATE_NEW_MIGRATION_SCRIPT = 'admin:migrations:createNewMigrationScript',
}

export enum ClientAction {
  // client
  GET_ALL_CLIENTS = 'admin:clients:getAllClients',
  GET_CLIENT_ACCESS = 'admin:clients:getClientAccess',
  GET_CLIENT_SWITCH = 'admin:clients:getClientSwitch',
}
