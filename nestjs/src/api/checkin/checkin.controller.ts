import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CheckinService } from './checkin.service';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) { }

  @Get('/')
  getAllStores() {
    return {};
  }

  @Get('/:storeId')
  getOneStore(@Query() { store, phone }) {
    console.log('PHONE', store);
    return {};
  }
}
