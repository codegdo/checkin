import { initialFunctions } from './00_initial_functions';
import { initialSchemas } from './00_initial_schemas';
import { utilFunctionsAndPlugins } from './01_initial_setup_util_functions_and_plugins';
import { configTablesAndFunctions } from './02_initial_setup_config_tables_and_functions';
import { migrationTablesAndFunctions } from './03_initial_setup_migration_tables_and_functions';

export const db_app = {
  initialFunctions: [initialFunctions],
  initialSchemas,
  migrations: [
    utilFunctionsAndPlugins,
    configTablesAndFunctions,
    migrationTablesAndFunctions,
  ],
};
