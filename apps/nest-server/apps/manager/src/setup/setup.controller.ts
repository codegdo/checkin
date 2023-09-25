import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SetupService } from './setup.service';
import {
  MANAGER_SERVICE_DROP_INITIAL_FUNCTIONS,
  MANAGER_SERVICE_DROP_INITIAL_SETUP,
  MANAGER_SERVICE_DROP_INITIAL_SCHEMAS,
  MANAGER_SERVICE_SEED_INITIAL_FUNCTIONS,
  MANAGER_SERVICE_SEED_INITIAL_SETUP,
  MANAGER_SERVICE_SEED_INITIAL_SCHEMAS,
} from '@app/common';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) { }

  @EventPattern(MANAGER_SERVICE_SEED_INITIAL_FUNCTIONS)
  async seedInitialFunctions() {
    return this.setupService.seedInitialFunctions();
  }

  @EventPattern(MANAGER_SERVICE_DROP_INITIAL_FUNCTIONS)
  async dropInitialFunctions() {
    return this.setupService.dropInitialFunctions();
  }

  @EventPattern(MANAGER_SERVICE_SEED_INITIAL_SCHEMAS)
  async seedInitialSchemas() {
    return this.setupService.seedInitialSchemas();
  }

  @EventPattern(MANAGER_SERVICE_DROP_INITIAL_SCHEMAS)
  async dropInitialSchemas() {
    return this.setupService.dropInitialSchemas();
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
