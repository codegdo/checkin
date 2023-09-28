import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Migration } from '../migration/migration.entity';
 
  
@Entity()
@Check(`"status" IN ('NotRolledBack', 'InProgress', 'Completed', 'Failed')`)
export class MigrationRollback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Migration, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'migration_id' })
  migration: Migration;

  @Column({ type: 'varchar', length: 50, default: 'NotRolledBack' })
  status: string;

  @Column({ type: 'text', nullable: true })
  error_message: string;

  @Column({ type: 'timestamp', nullable: true })
  started_at: Date;

  @Column({ type: 'interval', nullable: true })
  duration: string;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @Column({ type: 'boolean', default: false })
  is_rolledback: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, default: () => 'CURRENT_USER' })
  created_by: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_by: string;
}
