import { Global, Logger, Module } from '@nestjs/common';
import { ErrorService } from './error.service';

@Global()
@Module({
  providers: [ErrorService, Logger],
  exports: [ErrorService, Logger]
})
export class ErrorModule { }
