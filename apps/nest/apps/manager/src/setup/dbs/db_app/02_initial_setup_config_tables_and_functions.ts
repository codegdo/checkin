export const configTablesAndFunctions = {
  runningScripts: [
    // TABLES
    {
      id: 1,
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'config',
      scriptType: 'running',
      scriptOrder: '0',
      scriptPath: 'db_app/public/sys/table/config.sql',
    },
    // TYPES
    // FUNCTIONS
    {
      id: 100,
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'config_fn_get_config_by_key',
      scriptType: 'running',
      scriptOrder: '100',
      scriptPath: 'db_app/public/sys/function/config_fn_get_config_by_key.sql',
    },
    {
      id: 101,
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'config_fn_is_config_key_boolean',
      scriptType: 'running',
      scriptOrder: '101',
      scriptPath: 'db_app/public/sys/function/config_fn_is_config_key_boolean.sql',
    },
  ],
  rollbackScripts: [
    {
      id: 1,
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: '02_rb_initial_setup_config_tables_and_functions',
      scriptType: 'rollback',
      scriptOrder: '0',
      scriptPath:
        'db_app/rollback-scripts/02_rb_initial_setup_config_tables_and_functions.sql',
    },
  ],
};
