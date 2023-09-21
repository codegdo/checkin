import { schemas, publicFunctionsAndPlugins } from "./data";

export const initialSetupDatabase = {
  schemas,
  migrations: [
    publicFunctionsAndPlugins
  ]
}