import { Test, TestingModule } from '@nestjs/testing';
import { AuthMailService } from '../auth-mail.service';

describe('MailService', () => {
  let service: AuthMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMailService],
    }).compile();

    service = module.get<AuthMailService>(AuthMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
