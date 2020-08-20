import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionLogController } from './action-log.controller';
import { ActionLogService } from './action-log.service';
import { ActionLog } from './action-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActionLog])],
  controllers: [ActionLogController],
  providers: [ActionLogService],
})
export class ActionLogModule {}
