export enum MigrationPermission {
  ASSIGN_SCRIPTS_FOR_MIGRATION = 'manage:migration:assignScriptsToMigration',
  GET_ALL_MIGRATIONS = 'manage:migration:getAllMigrations',
  GET_MIGRATION_BY_ID = 'manage:migration:getMigrationById',
  GET_SCRIPTS_FOR_MIGRATION = 'manage:migration:getScriptsForMigration',
  CREATE_NEW_MIGRATION = 'manage:migration:createNewMigration',
  MIGRATION_RUN_BY_ID = 'manage:migration:migrationRunById',
  MIGRATION_ROLLBACK_BY_ID = 'manage:migration:migrationRollbackById',
}
