import { Body, Controller, Post } from '@nestjs/common';
import { Restricted } from 'src/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) { }

  @Restricted()
  @Post('checkin')
  checkin(@Body() checkinCustomerDto: { phone: string }) {
    return this.customerService.checkin(checkinCustomerDto);
  }

}
