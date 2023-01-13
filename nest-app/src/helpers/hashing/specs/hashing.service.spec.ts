import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from '../encrypt.service';
import { HashingService } from '../hashing.service';

describe('HashingService', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HashingService,
          useClass: EncryptService,
        },
      ],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
