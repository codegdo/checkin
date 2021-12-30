import { Test, TestingModule } from '@nestjs/testing';
import { AuthMessageService } from '../auth-message.service';

describe('AuthMessageService', () => {
  let service: AuthMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMessageService],
    }).compile();

    service = module.get<AuthMessageService>(AuthMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
