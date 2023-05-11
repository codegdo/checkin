import { Module } from '@nestjs/common';
import { IamModule } from './iam/iam.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [IamModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}