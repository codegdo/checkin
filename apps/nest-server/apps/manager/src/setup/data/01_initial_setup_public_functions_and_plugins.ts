export const publicFunctionsAndPlugins = {
  scripts: [
    // FUNCTIONS
  ],
  rollbackScripts: [
    {
      id: 1,
      databaseName: 'db_checkin',
      schemaName: '*',
      objectType: 'rollback',
      name: '01_rb_initial_setup_public_functions_and_plugins',
      scriptType: 'sql',
      scriptOrder: '0',
      scriptPath:
        'db_checkin/rollback-scripts/01_rb_initial_setup_public_functions_and_plugins.sql',
    },
  ],
};
