import { Test, TestingModule } from '@nestjs/testing';
import { AuthNotificationService } from '../auth-notification.service';

describe('AuthNotificationService', () => {
  let service: AuthNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthNotificationService],
    }).compile();

    service = module.get<AuthNotificationService>(AuthNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
