import { Test, TestingModule } from '@nestjs/testing';
import { ReloadController } from '../reload.controller';

describe('ReloadController', () => {
  let controller: ReloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReloadController],
    }).compile();

    controller = module.get<ReloadController>(ReloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
