import { Test, TestingModule } from '@nestjs/testing';
import { ReloadService } from './reload.service';

describe('ReloadService', () => {
  let service: ReloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReloadService],
    }).compile();

    service = module.get<ReloadService>(ReloadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
