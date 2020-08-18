import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionLog } from './action-log.entity';


@Injectable()
export class ActionLogService {
  constructor(
    @InjectRepository(ActionLog)
    private logRepository: Repository<ActionLog>,
  ) {}
  
  findAll(): Promise<ActionLog[]> {
    return this.logRepository.find();
  }
  
  findByUUID(uuid: string): Promise<ActionLog[]> {
    return this.logRepository.find({
      where: { uuid }, 
      order: {
        id: "DESC"
      }, 
    });
  }
  
  create(actionLog: ActionLog): Promise<ActionLog> {
    return this.logRepository.save(actionLog);
  }
  
}
