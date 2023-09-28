import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Migration } from '../migration/migration.entity';
import { MigrationRollback } from '../migration-rollback/migration-rollback.entity';


@Entity()
@Check(`"object_type" IN ('table', 'function', 'trigger', 'procedure', 'synonym', 'view')`)
@Check(`"script_type" IN ('running', 'rollback')`)
export class MigrationScript {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Migration, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'migration_id' })
  migration: Migration;

  @ManyToOne(() => MigrationRollback, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'migration_rollback_id' })
  migration_rollback: MigrationRollback;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'varchar', length: 50 })
  database_name: string;

  @Column({ type: 'varchar', length: 50 })
  schema_name: string;

  @Column({ type: 'varchar', length: 50 })
  object_type: string;

  @Column({ type: 'varchar', length: 10, default: 'running' })
  script_type: string;

  @Column({ type: 'varchar', length: 255 })
  script_path: string;

  @Column({ type: 'int', default: 0 })
  script_order: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  created_by: string;
}
  