import { Module } from '@nestjs/common';

import { DataSourceModule, LoggerModule, SessionModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { SetupModule } from './setup/setup.module';
import { ManageModule } from './manage/manage.module';

@Module({
  imports: [
    DataSourceModule.register('application'),
    SessionModule,
    AuthModule,
    SetupModule,
    ManageModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule { }
