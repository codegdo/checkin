import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { IamModule } from './api/iam/iam.module';
import { SigningService } from './services/signing/signing.service';
import { KeygenService } from './services/keygen/keygen.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, IamModule],
  controllers: [],
  providers: [SigningService, KeygenService],
})
export class AppModule { }
