import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SetupService } from './setup.service';
import { MANAGER_SERVICE_DATABASE_OPERATION } from '@app/common';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) { }

  @EventPattern(MANAGER_SERVICE_DATABASE_OPERATION)
  async performDatabaseOperation(payload) {
    console.log(payload);
    return this.setupService.performDatabaseOperation(payload);
  }

  @EventPattern('error-test')
  async test() {
    console.log('TEST');
  }
}
