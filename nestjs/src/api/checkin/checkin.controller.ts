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
  getAllLocations(@Query('phone') phone: string) {
    console.log('PHONE', phone);
    return { id: phone };
  }

  @Restricted()
  @Get('clients')
  getOneClient(@Query('phone') phone: string) {
    console.log('PHONE', phone);
    return { id: phone };
  }
}
