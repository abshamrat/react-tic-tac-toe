import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionLogController } from './action-log.controller';
import { ActionLogService } from './action-log.service';
import { ActionLog } from './action-log.entity';
import ormSqliteConfig from '../../../test/ormconfig.sqlite';

describe('ActionLogController', () => {
  let logController: ActionLogController;
  let logService: ActionLogService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormSqliteConfig), TypeOrmModule.forFeature([ActionLog])],
      controllers: [ActionLogController],
      providers: [ActionLogService],
    }).compile();

    logController = app.get<ActionLogController>(ActionLogController);
    logService = app.get<ActionLogService>(ActionLogService);
  });

  describe('/action-logs', () => {
    it("should return empty value", async () => {
      expect(await logController.findAll()).toBe([]);
    });

    it("should be able to create log", async () => {
      const data = {uuid: "123", logMessage: 'test log message'} as ActionLog;
      expect(await logController.create(data)).toMatchObject(data);
    });
  });
});
