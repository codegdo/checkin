import { Test, TestingModule } from '@nestjs/testing';
import { CheckinController } from './checkin.controller';

describe('CheckinController', () => {
  let controller: CheckinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckinController],
    }).compile();

    controller = module.get<CheckinController>(CheckinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
