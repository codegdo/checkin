import { Injectable } from '@nestjs/common';

@Injectable()
export class IamService {
  getHello(): string {
    return 'Hello World!';
  }
}
