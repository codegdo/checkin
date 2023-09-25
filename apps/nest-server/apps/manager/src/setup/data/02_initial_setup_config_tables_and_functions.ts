export const configTablesAndFunctions = {
  scripts: [
    // TABLES
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: 'sys',
      objectType: 'table',
      name: 'config',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath: 'db_checkin/scripts/sys/table/config.sql',
    },
    // FUNCTIONS
    {
      id: 100,
      databaseName: 'db_checkin',
      schemaName: 'sys',
      objectType: 'function',
      name: 'fn_get_config_by_key',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '100',
      scriptPath:
        'db_checkin/scripts/sys/function/fn_get_config_by_key.sql',
    },
    {
      id: 101,
      databaseName: 'db_checkin',
      schemaName: 'sys',
      objectType: 'function',
      name: 'fn_is_config_key_boolean',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '101',
      scriptPath:
        'db_checkin/scripts/sys/function/fn_is_config_key_boolean.sql',
    },
  ],
  rollbackScripts: [
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: '*',
      objectType: 'rollback',
      name: '02_rb_initial_setup_config_tables_and_functions',
      category: 'Initial Setup',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath:
        'db_checkin/rollback-scripts/02_rb_initial_setup_config_tables_and_functions.sql',
    },
  ],
};
