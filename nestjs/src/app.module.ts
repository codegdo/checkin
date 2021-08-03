import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { ConfigModule } from 'nestjs-config';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/admin/users/user.module';

@Module({
  imports: [
    // ConfigModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   username: process.env.POSTGRES_USERNAME,
    //   password: process.env.POSTGRES_PASSWORD,
    //   port: 5432,
    //   database: 'portal',
    //   name: 'default',
    //   //entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: false,
    // }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
