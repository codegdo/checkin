import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService, MANAGER_SERVICE } from '@app/common';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationRepository } from '@app/common/models/migration/migration.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([MigrationRepository]),
    ClientsModule.registerAsync([
      {
        name: MANAGER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configSerivce: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configSerivce.get<string>('MANAGER_HOST'),
            port: configSerivce.get<number>('MANAGER_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [MigrationController],
  providers: [MigrationService, MigrationRepository]
})
export class MigrationModule { }
