import { Test, TestingModule } from '@nestjs/testing';
import { createMemDB } from '../../utils/testing-helpers/create-memory-db';
import { ActionLogController } from './action-log.controller';
import { ActionLogService } from './action-log.service';
import { ActionLog } from './action-log.entity';
import { Connection, Repository } from 'typeorm';

describe('ActionLogController', () => {
  let logController: ActionLogController;
  let db: Connection;
  let logService: ActionLogService;
  let logRepository: Repository<ActionLog>

  beforeAll(async () => {
    db = await createMemDB([ActionLog]);
    logRepository = await db.getRepository(ActionLog);
    logService = new ActionLogService(logRepository);
    logController = new ActionLogController(logService);
  })
  afterAll(() => db.close())

  describe('/action-logs', () => {
    const logData = {uuid: "123", logMessage: 'test log message'} as ActionLog;
    
    it("GET(/): should return empty value for the first run", async () => {
      expect(await logController.findAll()).toEqual([]);
    });

    it("POST(/): should be able to store log", async () => {
      const createdLog = await logController.create(logData);
      expect(createdLog).toHaveProperty('logMessage', logData.logMessage);
      expect(createdLog).toHaveProperty('uuid', logData.uuid);
    });

    it("GET(/:uuid): should be able return only logs by uuid", async () => {
      // adding different data
      const data = {uuid: "321", logMessage: 'test log message'} as ActionLog;
      const createdLog = await logController.create(data);

      // Finding only the logs related to uuid
      const logByUUId = await logController.findByUUID({uuid: logData.uuid});
      
      // Expecting it is only return logs where the uuid is 123
      expect(logByUUId[0]).toHaveProperty('logMessage', logData.logMessage);
      expect(logByUUId[0]).toHaveProperty('uuid', logData.uuid);

      // Making sure the data we populate it is there too
      expect(createdLog).toHaveProperty('logMessage', data.logMessage);
      expect(createdLog).toHaveProperty('uuid', data.uuid);
    });
    
    it("GET(/:uuid): should not return only logs when no uuid match", async () => {
      // Trying to get result for invalid uuid
      const logByUUId = await logController.findByUUID({uuid: "invalid"});
      // It should return [] if not found
      expect(logByUUId).toEqual([]);
    });
  });
});
