import { Module } from '@nestjs/common';

import { DatabaseModule, SessionModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { SetupModule } from './setup/setup.module';
import { ManageModule } from './manage/manage.module';

@Module({
  imports: [
    DatabaseModule.register('application'),
    SessionModule,
    AuthModule,
    SetupModule,
    ManageModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule { }
