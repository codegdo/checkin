export enum MigrationAction {
  ASSIGN_SCRIPTS_FOR_MIGRATION = 'admin:migrations:assignScriptsToMigration',
  GET_ALL_MIGRATIONS = 'admin:migrations:getAllMigrations',
  GET_MIGRATION_BY_ID = 'admin:migrations:getMigrationById',
  GET_SCRIPTS_FOR_MIGRATION = 'admin:migrations:getScriptsForMigration',
  GET_ROLLBACKS_FOR_MIGRATION = 'admin:migrations:getRollbacksForMigration',
  CREATE_NEW_MIGRATION = 'admin:migrations:createNewMigration',
  MIGRATION_RUN_BY_ID = 'admin:migrations:migrationRunById',
  MIGRATION_ROLLBACK_BY_ID = 'admin:migrations:migrationRollbackById',
}
