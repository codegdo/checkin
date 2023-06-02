import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/configs';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configSerivce: ConfigService) => {
        return configSerivce.get('database.checkin');
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        //await dataSource.manager.query(`CREATE TABLE main_sec.user`);
        const queryRunner = await dataSource.createQueryRunner();
        var result = await queryRunner.manager.query(
          `
          CREATE TABLE IF NOT EXISTS main_sec.session (
            id CHARACTER VARYING PRIMARY KEY,
            data JSONB,
            expiration BIGINT,
            deleted_at DATE
          )
          `
        );

        console.log('TEST', result);
        return dataSource;
      }
    })
  ],
  providers: [],
  controllers: [],
})
export class DatabaseModule { }
