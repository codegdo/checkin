import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'db-portal-dev.cv6zlchcwrxt.us-west-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'postgres_dev',
      database: 'portal',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    };
  }
}
