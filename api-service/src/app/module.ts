import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ActionLogModule } from './action-log/action-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ActionLogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
