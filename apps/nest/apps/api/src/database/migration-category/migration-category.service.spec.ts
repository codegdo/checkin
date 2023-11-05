import { Test, TestingModule } from '@nestjs/testing';
import { MigrationCategoryService } from './migration-category.service';

describe('MigrationCategoryService', () => {
  let service: MigrationCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationCategoryService],
    }).compile();

    service = module.get<MigrationCategoryService>(MigrationCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
