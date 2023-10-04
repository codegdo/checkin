import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';

@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  // static forRoot() {
  //   // You can configure and load your environment variables here if needed.
  //   return {
  //     module: ConfigModule,
  //   };
  // }
}
export { ConfigService };
