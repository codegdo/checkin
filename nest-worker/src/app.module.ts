import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [ConfigModule.forRoot(), MigrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
