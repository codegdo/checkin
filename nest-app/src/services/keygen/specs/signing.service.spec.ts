import { Test, TestingModule } from '@nestjs/testing';
import { SigningService } from '../signing.service';

describe('SigningService', () => {
  let service: SigningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SigningService],
    }).compile();

    service = module.get<SigningService>(SigningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
