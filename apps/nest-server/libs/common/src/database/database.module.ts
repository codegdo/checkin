import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSerivce: ConfigService) => ({
        type: 'postgres',
        host: configSerivce.get('POSTGRES_HOST'),
        username: configSerivce.get('POSTGRES_USERNAME'),
        password: configSerivce.get('POSTGRES_PASSWORD'),
        port: configSerivce.get('POSTGRES_PORT'),
        database: configSerivce.get('POSTGRES_DB_CHECKIN'),
        name: 'default',
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        max: 10,
        min: 2,
      }),
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
  ],
})
export class DatabaseModule { }
