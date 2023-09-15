export const initialSetupMigrations = [
  {
    migrationFiles: [
      {
        id: 1,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'config',
        scriptType: 'sql',
        scriptOrder: '0',
        scriptPath: 'scripts/main_sys/table/config.sql',
      },
      {
        id: 200,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'function',
        name: 'config',
        scriptType: 'sql',
        scriptOrder: '200',
        scriptPath: 'scripts/main_sys/function/fn_get_config_key.sql',
      },
      {
        id: 201,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'function',
        name: 'config',
        scriptType: 'sql',
        scriptOrder: '201',
        scriptPath: 'scripts/main_sys/function/fn_check_config_key_boolean.sql',
      },
    ],
    rollbackFiles: [
      {
        id: 1,
        database: 'db_checkin',
        schema: '*',
        objectType: 'rollback',
        name: '00000_rb_configs',
        scriptType: 'sql',
        scriptOrder: '0',
        scriptPath: 'rollbacks/00000_rb_configs.sql',
      },
    ],
  },
  {
    migrationFiles: [
      {
        id: 1,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'migration_category',
        scriptType: 'sql',
        scriptOrder: '0',
        scriptPath: 'scripts/main_sys/table/migration_category.sql',
      },
      {
        id: 2,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'migration',
        scriptType: 'sql',
        scriptOrder: '1',
        scriptPath: 'scripts/main_sys/table/migration.sql',
      },
      {
        id: 3,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'migration_rollback',
        scriptType: 'sql',
        scriptOrder: '2',
        scriptPath: 'scripts/main_sys/table/migration_rollback.sql',
      },
      {
        id: 4,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'migration_script',
        scriptType: 'sql',
        scriptOrder: '3',
        scriptPath: 'scripts/main_sys/table/migration_script.sql',
      },
      {
        id: 5,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'migration_dependency',
        scriptType: 'sql',
        scriptOrder: '4',
        scriptPath: 'scripts/main_sys/table/migration_dependency.sql',
      },
      {
        id: 6,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'migration_tag',
        scriptType: 'sql',
        scriptOrder: '5',
        scriptPath: 'scripts/main_sys/table/migration_tag.sql',
      },
      {
        id: 7,
        database: 'db_checkin',
        schema: 'main_sys',
        objectType: 'table',
        name: 'migration_metadata',
        scriptType: 'sql',
        scriptOrder: '6',
        scriptPath: 'scripts/main_sys/table/migration_metadata.sql',
      },
    ],
    rollbackFiles: [
      {
        id: 1,
        database: 'db_checkin',
        schema: '*',
        objectType: 'rollback',
        name: '00000_rb_migrations',
        scriptType: 'sql',
        scriptOrder: '0',
        scriptPath: 'rollbacks/00000_rb_migrations.sql',
      },
    ],
  },
];
