import { Module } from '@nestjs/common';
import * as session from 'express-session';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Module({
  providers: [],
})
export class CommonModule {}
