import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { IamModule } from './api/iam/iam.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, IamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
