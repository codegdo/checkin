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
          CREATE TABLE IF NOT EXISTS main_sec.user (
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            passcode NUMERIC(4),
            group_id INT,
            role_id INT,
            company_id INT,
            is_reset_required BOOLEAN DEFAULT FALSE,
            is_active BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by VARCHAR(50) DEFAULT CURRENT_USER,
            updated_by VARCHAR(50)
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
