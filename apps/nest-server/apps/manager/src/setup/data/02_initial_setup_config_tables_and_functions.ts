export const configTablesAndFunctions = {
  scripts: [
    // TABLES
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'table',
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'config',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath: 'db_checkin/scripts/public/sys/tables/config.sql',
    },
    // FUNCTIONS
    {
      id: 100,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'function',
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'fn_get_config_by_key',
      scriptType: 'sql',
      scriptOrder: '100',
      scriptPath:
        'db_checkin/scripts/public/sys/functions/fn_get_config_by_key.sql',
    },
    {
      id: 101,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'function',
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'fn_is_config_key_boolean',
      scriptType: 'sql',
      scriptOrder: '101',
      scriptPath:
        'db_checkin/scripts/public/sys/functions/fn_is_config_key_boolean.sql',
    },
  ],
  rollbackScripts: [
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'rollback',
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: '02_rb_initial_setup_config_tables_and_functions',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath:
        'db_checkin/rollback-scripts/02_rb_initial_setup_config_tables_and_functions.sql',
    },
  ],
};
