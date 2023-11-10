import { Test, TestingModule } from '@nestjs/testing';
import { MigrationScriptService } from './migration-script.service';

describe('MigrationScriptService', () => {
  let service: MigrationScriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationScriptService],
    }).compile();

    service = module.get<MigrationScriptService>(MigrationScriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
