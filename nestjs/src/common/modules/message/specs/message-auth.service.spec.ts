import { Test, TestingModule } from '@nestjs/testing';
import { MessageAuthService } from '../message-auth.service';

describe('MessageAuthService', () => {
  let service: MessageAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageAuthService],
    }).compile();

    service = module.get<MessageAuthService>(MessageAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
