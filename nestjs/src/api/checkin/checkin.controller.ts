import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Restricted } from 'src/common';
import { CheckinService } from './checkin.service';

@Controller('checkin')
export class CheckinController {
  constructor(
    private readonly checkinService: CheckinService,
  ) { }

  @Restricted()
  @Get('/')
  getAllLocations() {
    return {};
  }

  @Restricted()
  @Get('clients')
  getOneClient(@Query() { location, phone }) {
    console.log('PHONE', location);
    return {};
  }
}
