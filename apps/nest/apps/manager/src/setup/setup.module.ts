import { Module } from '@nestjs/common';
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [UtilModule],
  controllers: [SetupController],
  providers: [SetupService]
})
export class SetupModule { }
