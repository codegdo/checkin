
import { Module } from '@nestjs/common';
import { PrefixService } from './prefix.service';

@Module({
  providers: [PrefixService],
  exports: [PrefixService],
})
export class PrefixModule { }

