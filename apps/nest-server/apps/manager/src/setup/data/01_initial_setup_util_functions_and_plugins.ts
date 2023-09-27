export const utilFunctionsAndPlugins = {
  scripts: [
    // FUNCTIONS
    {
      id: 100,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'function',
      category: 'Initial Setup',
      migration: 'Util Funtions And Plugins',
      scriptName: 'fn_camel_case_split',
      scriptType: 'sql',
      scriptOrder: '100',
      scriptPath:
        'db_checkin/scripts/public/util/functions/fn_camel_case_split.sql',
    },
    {
      id: 101,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'function',
      category: 'Initial Setup',
      migration: 'Util Funtions And Plugins',
      scriptName: 'fn_generate_random_string',
      scriptType: 'sql',
      scriptOrder: '101',
      scriptPath:
        'db_checkin/scripts/public/util/functions/fn_generate_random_string.sql',
    },
    {
      id: 102,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'function',
      category: 'Initial Setup',
      migration: 'Util Funtions And Plugins',
      scriptName: 'fn_lookup_value_split_to_json',
      scriptType: 'sql',
      scriptOrder: '102',
      scriptPath:
        'db_checkin/scripts/public/util/functions/fn_lookup_value_split_to_json.sql',
    },
    {
      id: 103,
      databaseName: 'db_checkin',
      schemaName: 'public',
      objectType: 'function',
      category: 'Initial Setup',
      migration: 'Util Funtions And Plugins',
      scriptName: 'fn_lookup_value',
      scriptType: 'sql',
      scriptOrder: '103',
      scriptPath:
        'db_checkin/scripts/public/util/functions/fn_lookup_value.sql',
    },
  ],
  rollbackScripts: [
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: '*',
      objectType: 'rollback',
      category: 'Initial Setup',
      migration: 'Util Funtions And Plugins',
      scriptName: '01_rb_initial_setup_util_functions_and_plugins',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath:
        'db_checkin/rollback-scripts/01_rb_initial_setup_util_functions_and_plugins.sql',
    },
  ],
};
