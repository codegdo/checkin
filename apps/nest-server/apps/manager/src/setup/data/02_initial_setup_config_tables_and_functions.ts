export const configTablesAndFunctions = {
  migrationScripts: [
    // TABLES
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: 'main_sys',
      objectType: 'table',
      name: 'config',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath: 'db_checkin/scripts/main_sys/table/config.sql',
    },
    // FUNCTIONS
    {
      id: 100,
      databaseName: 'db_checkin',
      schemaName: 'main_sys',
      objectType: 'function',
      name: 'fn_get_config_by_key',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '100',
      scriptPath:
        'db_checkin/scripts/main_sys/function/fn_get_config_by_key.sql',
    },
    {
      id: 101,
      databaseName: 'db_checkin',
      schemaName: 'main_sys',
      objectType: 'function',
      name: 'fn_is_config_key_boolean',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '101',
      scriptPath:
        'db_checkin/scripts/main_sys/function/fn_is_config_key_boolean.sql',
    },
  ],
  rollbackScripts: [
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: '*',
      objectType: 'rollback',
      name: '00002_rb_config_tables_and_functions',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath:
        'db_checkin/rollback-scripts/02_rb_initial_setup_config_tables_and_functions.sql',
    },
  ],
};
