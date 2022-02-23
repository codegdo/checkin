import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Restricted } from 'src/common/decorators';
import { CheckinService } from './checkin.service';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) { }

  @Restricted()
  @Get('/')
  getAllStores() {
    return {};
  }

  @Restricted()
  @Get('/:storeId')
  getOneStore(@Query() { store, phone }) {
    console.log('PHONE', store);
    return {};
  }
}
