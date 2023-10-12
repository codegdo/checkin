# Nest App Setup Config Module

## Convert the Project into a Monorepo

- Generate a library named "common" to share code between microservices: `nest generate library common`

## Install Dependencies `@nestjs/config`

- Run `npm install @nestjs/config`

## Create Config Module

1. Generate a config module for configuration settings:

- Run `nest generate module config -p common`

2. After generating the module, you'll find default common module files. You can remove these if not needed for your specific project.

3. Export the ConfigModule from `src/common/index.ts`:

-In `src/common/index.ts`, ensure that ConfigModule is correctly exported for use in your application:

```ts
export * from './config/config.module';
```

4. In src/common/config/config.module.ts, implement the ConfigModule as follows:

```ts
import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';

@Global()
@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```

## Create a File Named `.env` at the Root Folder

- Create a file named `.env` at the root of your project and define environment variables, for example:

```env
# Apps
API_HOST=localhost
API_PORT=5000
API_VERSION=1.0.0
```

## Clean Up AppModule

1. Remove the `AppService` and `AppController` from the `AppModule` by deleting or commenting out the corresponding code.
2. In `src/common/config/config.module.ts`, implement the ConfigModule as follows:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/common';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

3. Update `main.ts` to use the port from the configuration. You'll need to get the `ConfigService` and retrieve the `API_PORT` value from your configuration.

- In `src/main.ts`, modify the code as follows:

```ts
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Retrieve the port from the configuration
  const port = configService.get<number>('API_PORT') || 5000;

  await app.listen(port);
}
bootstrap();
```
