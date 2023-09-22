import {
  schemas,
  globalFunctions,
  publicFunctionsAndPlugins,
  configTablesAndFunctions,
  migrationTablesAndFunctions,
} from './data';

export const initializationData = {
  globalFunctions: [globalFunctions],
  schemas,
  migrations: [
    publicFunctionsAndPlugins,
    configTablesAndFunctions,
    migrationTablesAndFunctions,
  ],
};
