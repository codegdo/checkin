export const publicFunctionsAndPlugins = {
  migrationScripts: [
    // FUNCTIONS
    {
      id: 100,
      databaseName: 'db_checkin',
      schemaName: 'main_sys',
      objectType: 'function',
      name: '_fn_drop_functions',
      scriptType: 'sql',
      scriptOrder: '100',
      scriptPath: 'db_checkin/scripts/public/function/_fn_drop_functions.sql',
    },
    {
      id: 101,
      databaseName: 'db_checkin',
      schemaName: 'main_sys',
      objectType: 'function',
      name: '_fn_drop_procedures',
      scriptType: 'sql',
      scriptOrder: '101',
      scriptPath: 'db_checkin/scripts/public/function/_fn_drop_procedures.sql',
    },
    {
      id: 101,
      databaseName: 'db_checkin',
      schemaName: 'main_sys',
      objectType: 'function',
      name: '_fn_drop_tables',
      scriptType: 'sql',
      scriptOrder: '102',
      scriptPath: 'db_checkin/scripts/public/function/_fn_drop_tables.sql',
    },
  ],
  rollbackScripts: [
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: '*',
      objectType: 'rollback',
      name: '00001_rb_public_functions_and_plugins',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath: 'db_checkin/rollback-scripts/initial-setup/00001_rb_public_functions_and_plugins.sql',
    },
  ],
}