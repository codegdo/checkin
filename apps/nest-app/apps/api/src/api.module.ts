import { Module } from '@nestjs/common';

import { DatabaseModule, SessionModule } from '@app/common';
import { AuthModule } from './auth/auth.module';
import { ConsoleModule } from './console/console.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, SessionModule, AuthModule, ConsoleModule],
  controllers: [],
  providers: [],
})
export class ApiModule { }
