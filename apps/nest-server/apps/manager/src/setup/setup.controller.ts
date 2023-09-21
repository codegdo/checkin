import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) { }

  @EventPattern('db_seed_schemas')
  async seedSchemas() {
    return this.setupService.seedSchemas();
  }

  @EventPattern('db_drop_schemas')
  async dropSchemas() {
    //return this.setupService.dropSchemas();
  }

  @EventPattern('db_seed_initial_setup')
  async seedIntialSetup(payload) {
    //return this.setupService.seedIntialSetup(payload);
  }

  @EventPattern('db_drop_initial_setup')
  async dropIntialSetup(payload) {
    //return this.setupService.dropIntialSetup(payload);
  }
}
