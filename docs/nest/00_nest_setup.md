# Nest App Setup Instructions

## Prerequisites

- Install Nest CLI globally: `npm i -g @nestjs/cli`

## Create a New Project

1. Start by creating a new project named "nest-server":

  - Run `nest new nest-server`
  - Once the app scaffold is complete, navigate to the "nest-server" directory.
  - Start the application: `npm run start`

## Sending a Request

2. Download and install Postman Desktop.
  - Use Postman to send a test request to http://localhost:5000.

## Convert the Project into a Monorepo or Microservice

- Generate a library named "common" to share code between microservices: `nest generate library common`

## Install Dependencies for the Database

- Install necessary packages for database interactions:

  - Run `npm install pg`
  - Run `npm install typeorm`
  - Run `npm install @nestjs/typeorm`
  - Run `npm install @nestjs/config`

## Create Dynamic DataSource Module

- Generate a "datasource" module for dynamic database configuration:

  - Run `nest generate module datasource -p common`

  In `datasource.module.ts`, you can implement the module as follows:
  ```ts
  @Module({})
  export class DataSourceModule {
    static register(instanceName?: string): DynamicModule {
      return {
        module: DataSourceModule,
        imports: [],
        providers: [],
      };
    }
  }
  ```

## Create Dynamic Config Module

- Generate a "config" module for dynamic configuration settings:

  - Run `nest generate module config -p common`

  In `config.module.ts`, you can implement the module as follows:
  ```ts
  import { Global, Module } from '@nestjs/common';
  import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';

  @Global()
  @Module({
    imports: [
      NestConfigModule.forRoot({
        envFilePath: process.env.NODE_ENV
          ? `.env.${process.env.NODE_ENV}`
          : '.env', // Load environment-specific .env file
      }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
  })
  export class ConfigModule { }
  ```






















# Nest App Setup Instructions

## Preps Install

- Run `npm i -g @nestjs/cli`

## Create a New project

1. Start by creating a new poject "nest-server"

- Run `nest new nest-server`
- When done scaffold the app, cd to "nest-server"
- Run `npm run start`

## Sending a Request

2. Download postman desktop

- Send a test request to http://localhost:5000

## Turn project into a mono repo or microservice

- Run `nest generate libary common`

## Install Dependencies for Database

- Run `npm install pg`
- Run `npm install typeorm`
- Run `npm install @nestjs/typeorm`
- Run `npm install @nestjs/config`

## Create Dynamic DataSource Module

- Run `npm generate module datasource -p common`

```ts
@Module({})
export class DataSourceModule {
  static register(instanceName?: string): DynamicModule {
    return {
      module: DataSourceModule,
      imports: [],
      providers: [],
    };
  }
}
```

## Create Dynamic Config Module

- Run `npm generate module config -p common`

```ts
@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env', // Load environment-specific .env file
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
```

## Create a file name as .env at the root folder
```env
# apps
API_HOST=localhost
API_PORT=5000
API_VERSION=1.0.0
```

## Create Micro Service App Api

- Run `npm generate app api`
- Update "nest-cli.json" and set api as main entry
- Remove nest-server

## Create Micro Service App Manager

- Run `npm generate app manager`
