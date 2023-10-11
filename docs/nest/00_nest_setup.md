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

## Create Dynamic Datasource and Config Modules

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

- Run `npm generate module config -p common`
