import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { SessionModule } from '@app/common/session/session.module';

@Module({
  imports: [DatabaseModule, SessionModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
