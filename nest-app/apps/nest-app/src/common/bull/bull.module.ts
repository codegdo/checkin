import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule as NestBullModule } from "@nestjs/bull";

@Module({
  imports: [
    NestBullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>("REDIS_HOST"),
          port: +configService.get<number>("REDIS_PORT"),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
})
export class BullModule { }
