export const configTablesAndFunctions = {
  runningScripts: [
    // TABLES
    {
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'config',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/table/config.sql',
    },
    // TYPES
    // FUNCTIONS
    {
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'config_fn_get_config_by_key',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/function/config_fn_get_config_by_key.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'config_fn_is_config_key_boolean',
      scriptType: 'running',
      scriptPath: 'db_app/public/sys/function/config_fn_is_config_key_boolean.sql',
    },
  ],
  rollbackScripts: [
    {
      category: 'Initial Setup',
      migration: 'Config Tables And Functions',
      scriptName: 'rb_config_tables_and_functions',
      scriptType: 'rollback',
      scriptPath:
        'db_app/rollback-scripts/initial_setup/rb_config_tables_and_functions.sql',
    },
  ],
};
