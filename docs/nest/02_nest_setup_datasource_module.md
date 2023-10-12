# Nest App Setup DataSource

## Prerequisites

- Before you begin, make sure you have the PostgreSQL driver installed locally.

## Step 1: Install Dependencies for the Database

- To interact with the PostgreSQL database, you'll need to install the necessary packages. Open your terminal and run the following commands:

  ```ts
  npm install pg
  npm install typeorm
  npm install @nestjs/typeorm
  ```

- These packages are essential for connecting to and working with your PostgreSQL database.

## Step 2: Create the Dynamic DataSource Module

- Next, you'll create a "datasource" module to handle dynamic database configuration. Follow these steps:

  - Use the Nest CLI to generate the "datasource" module. In your terminal, run the following command:

  ```ts
  nest generate module datasource -p common
  ```

  - This command will create the initial structure for your data source module.

- Implement the Module

  - Open the `datasource.module.ts` file, which was generated in the previous step. Inside this file, you can implement the module as follows:

  ```ts
  import { Module, DynamicModule } from '@nestjs/common';

  @Module({})
  export class DataSourceModule {
    // Allowing pass an instanceName parameter during registration
    static register(instanceName?: string): DynamicModule {
      return {
        module: DataSourceModule,
        imports: [],
        providers: [],
      };
    }
  }
  ```

## Step 3: Configure Data Source

- In this step, you will configure the data source for your Nest application. This involves defining the necessary environment variables for PostgreSQL configuration and setting up TypeORM to connect to the database.

- Define PostgreSQL Environment Variables

  - Open your preferred text editor and create or update your environment variables file, typically named `.env`. Define the PostgreSQL configuration variables within the file, as shown below:

  ```env
  # Database
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_DB=postgres
  POSTGRES_USERNAME=postgres
  POSTGRES_PASSWORD=password
  ```

  These environment variables store essential information for connecting to your PostgreSQL database, such as the host, port, database name, username, and password.

- Configure TypeORM for PostgreSQL

  - Now, you'll configure TypeORM to connect to the PostgreSQL database. Follow these steps:

    - Open the `datasource.module.ts` file, which was generated in a previous step. This file is where you'll set up the database configuration.
    - Inside the `DataSourceModule` class, locate the `TypeOrmModule.forRootAsync` configuration and modify it as shown below:

    ```ts
    import { Module, DynamicModule } from '@nestjs/common';
    import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
    import { DataSource } from 'typeorm';
    import { ConfigService } from '@nestjs/config';

    import { ConfigModule } from '../config/config.module';

    @Module({})
    export class DataSourceModule {
      // Allowing passing an instanceName parameter during registration
      static register(instanceName?: string): DynamicModule {
        return {
          module: DataSourceModule,
          imports: [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule], // Ensure the ConfigModule is imported
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => {
                const databaseConfig: TypeOrmModuleOptions = {
                  type: 'postgres',
                  host: configService.get('POSTGRES_HOST'),
                  port: configService.get('POSTGRES_PORT'),
                  username: configService.get('POSTGRES_USERNAME'),
                  password: configService.get('POSTGRES_PASSWORD'),
                  database: configService.get('POSTGRES_DB'), // Corrected variable name
                  synchronize: false,
                  logging: true,
                  entities: [], // Add your entities here
                };
                return databaseConfig;
              },
              dataSourceFactory: async (options) =>
                new DataSource(options).initialize(),
            }),
          ],
          providers: [],
        };
      }
    }
    ```

- In the above code:
  - Ensure that the `ConfigModule` is imported and included in the `imports` array.
  - The PostgreSQL configuration parameters are retrieved from the `configService` using the environment variables you defined in the `.env` file.
