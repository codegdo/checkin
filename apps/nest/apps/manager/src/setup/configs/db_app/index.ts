import { initialFunctions } from './initial_functions';
import { initialSchemas } from './initial_schemas';
import { utilFunctionsAndPlugins } from './util_functions_and_plugins';
import { configTablesAndFunctions } from './config_tables_and_functions';
import { migrationTablesAndFunctions } from './migration_tables_and_functions';

const db_app = {
  initialFunctions: [initialFunctions],
  initialSchemas,
  migrations: [
    utilFunctionsAndPlugins,
    configTablesAndFunctions,
    migrationTablesAndFunctions,
  ],
};

export default db_app;
