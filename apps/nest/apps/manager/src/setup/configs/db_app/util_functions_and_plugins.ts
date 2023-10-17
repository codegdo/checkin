export const utilFunctionsAndPlugins = {
  runningScripts: [
    // TYPES
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'type_user_role_info',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/type/type_user_role_info.sql',
    },

    // FUNCTIONS
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_all_privileges',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_all_privileges.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_camel_case_split',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_camel_case_split.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_function_by_name',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_function_by_name.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_generate_random_string',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_generate_random_string.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_granted_privileges_by_user',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_granted_privileges_by_user.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_lookup_value_split_to_json',
      scriptType: 'running',
      scriptPath:
        'db_app/public/util/function/util_fn_get_lookup_value_split_to_json.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_lookup_value',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_lookup_value.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_procedure_by_name',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_procedure_by_name.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_schema_by_name',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_schema_by_name.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_table_by_name',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_table_by_name.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_trigger_by_name',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_trigger_by_name.sql',
    },
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'util_fn_get_user_role_info',
      scriptType: 'running',
      scriptPath: 'db_app/public/util/function/util_fn_get_user_role_info.sql',
    },
  ],
  rollbackScripts: [
    {
      category: 'Initial Setup',
      migration: 'Util Functions And Plugins',
      scriptName: 'rb_util_functions_and_plugins',
      scriptType: 'rollback',
      scriptPath:
        'db_app/rollback-scripts/initial_setup/rb_util_functions_and_plugins.sql',
    },
  ],
};
