import {
  initialFunctions,
  initialSchemas,
  publicFunctionsAndPlugins,
  configTablesAndFunctions,
  migrationTablesAndFunctions,
} from './data';

export const initializationData = {
  initialFunctions: [initialFunctions],
  initialSchemas,
  migrations: [
    publicFunctionsAndPlugins,
    configTablesAndFunctions,
    migrationTablesAndFunctions,
  ],
};
