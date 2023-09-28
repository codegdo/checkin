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
import { MigrationCategory } from '../migration-category/migration-category.entity';
  
@Entity()
@Check(`"status" IN ('Pending', 'InProgress', 'Completed', 'Failed')`)
export class Migration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, default: 'Pending' })
  status: string;

  @Column({ type: 'text', nullable: true })
  error_message: string;

  @Column({ type: 'timestamp', nullable: true })
  started_at: Date;

  @Column({ type: 'interval', nullable: true })
  duration: string;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @Column({ type: 'int', default: 0 })
  execution_order: number;

  @Column({ type: 'boolean', default: false })
  is_executed: boolean;

  @Column({ type: 'boolean', default: false })
  is_required: boolean;

  @Column({ type: 'boolean', default: false })
  has_dependent: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  app_version: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  build_version: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  commit_hash: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  checksum: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  environment: string;

  @Column({ type: 'boolean', default: true })
  is_enabled: boolean;

  @ManyToOne(() => MigrationCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'migration_category_id' })
  migration_category: MigrationCategory;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, default: () => 'CURRENT_USER' })
  created_by: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_by: string;
}
  