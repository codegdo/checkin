import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {

  checkin(checkinCustomerDto) {
    return { id: "1" };
  }
}
