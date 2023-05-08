import { Test, TestingModule } from '@nestjs/testing';
import { IamController } from './iam.controller';
import { IamService } from './iam.service';

describe('IamController', () => {
  let iamController: IamController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IamController],
      providers: [IamService],
    }).compile();

    iamController = app.get<IamController>(IamController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(iamController.getHello()).toBe('Hello World!');
    });
  });
});
