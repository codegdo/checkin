import { Test, TestingModule } from '@nestjs/testing';
import { KeygenService } from '../keygen.service';

describe('KeygenService', () => {
  let service: KeygenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeygenService],
    }).compile();

    service = module.get<KeygenService>(KeygenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
