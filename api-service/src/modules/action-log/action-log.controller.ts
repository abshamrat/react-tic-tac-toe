import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ActionLogService } from './action-log.service';
import { ActionLog } from './action-log.entity';

@Controller('action-logs')
export class ActionLogController {
  constructor(private readonly actionLogService: ActionLogService) {}

  @Get()
  async findAll(): Promise<ActionLog[]> {
    const logList = await this.actionLogService.findAll();
    return logList;
  }

  @Get('/:uuid')
  async findByUUID(@Param() param): Promise<ActionLog[]> {
    const logList = await this.actionLogService.findByUUID(param.uuid);
    return logList;
  }

  @Post()
  async create(@Body() actionLog: ActionLog): Promise<ActionLog> {
    return this.actionLogService.create(actionLog);
  }
}
