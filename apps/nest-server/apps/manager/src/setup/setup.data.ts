import {
  initialFunctions,
  initialSchemas,
  utilFunctionsAndPlugins,
  configTablesAndFunctions,
  migrationTablesAndFunctions,
} from './data';

export const initializationData = {
  initialFunctions: [initialFunctions],
  initialSchemas,
  migrations: [
    utilFunctionsAndPlugins,
    configTablesAndFunctions,
    migrationTablesAndFunctions,
  ],
};
