import { Controller } from '@nestjs/common';
import { AuthType } from 'src/constants';
import { Auth } from 'src/decorators';

@Auth(AuthType.None)
@Controller('billing')
export class BillingController {

}
