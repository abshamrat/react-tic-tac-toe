import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class ActionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  logMessage: string;

  // We should keep timestamp for the action log
  // @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  // createdAt: Timestamp;
}