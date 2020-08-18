import { Test, TestingModule } from '@nestjs/testing';
import { ActionLogController } from './action-log.controller';
import { ActionLogService } from './action-log.service';

describe('ActionLogController', () => {
  let logController: ActionLogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ActionLogController],
      providers: [ActionLogService],
    }).compile();

    logController = app.get<ActionLogController>(ActionLogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(logController.getHello()).toBe('Hello World!');
    });
  });
});
