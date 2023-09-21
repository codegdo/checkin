import {
  schemas,
  publicFunctionsAndPlugins,
  configTablesAndFunctions,
  migrationTablesAndFunctions,
} from './data';

export const initializationData = {
  schemas,
  migrations: [
    publicFunctionsAndPlugins,
    configTablesAndFunctions,
    migrationTablesAndFunctions,
  ],
};
