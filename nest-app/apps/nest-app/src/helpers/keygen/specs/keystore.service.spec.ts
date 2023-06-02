import { Test, TestingModule } from '@nestjs/testing';
import { KeygenService } from '../keygen.service';
import { KeystoreService } from '../keystore.service';

describe('KeystoreService', () => {
  let service: KeystoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: KeystoreService,
          useClass: KeygenService,
        },
      ],
    }).compile();

    service = module.get<KeystoreService>(KeystoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
