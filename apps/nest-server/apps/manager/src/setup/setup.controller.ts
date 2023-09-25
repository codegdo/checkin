import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SetupService } from './setup.service';
import { MANAGER_SERVICE_DROP_INITIAL_SETUP, MANAGER_SERVICE_DROP_SCHEMAS, MANAGER_SERVICE_SEED_GLOBAL_FUNTIONS, MANAGER_SERVICE_SEED_INITIAL_SETUP, MANAGER_SERVICE_SEED_SCHEMAS } from '@app/common';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) { }

  @EventPattern(MANAGER_SERVICE_SEED_GLOBAL_FUNTIONS)
  async seedGlobalFunctions() {
    return this.setupService.seedGlobalFunctions();
  }

  @EventPattern(MANAGER_SERVICE_SEED_SCHEMAS)
  async seedSchemas() {
    return this.setupService.seedSchemas();
  }

  @EventPattern(MANAGER_SERVICE_DROP_SCHEMAS)
  async dropSchemas() {
    return this.setupService.dropSchemas();
  }

  @EventPattern(MANAGER_SERVICE_SEED_INITIAL_SETUP)
  async seedIntialSetup() {
    return this.setupService.seedInitialSetup();
  }

  @EventPattern(MANAGER_SERVICE_DROP_INITIAL_SETUP)
  async dropIntialSetup() {
    return this.setupService.dropInitialSetup();
  }
}
