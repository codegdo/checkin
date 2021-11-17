import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';


@Entity({ database: 'main', schema: 'log', name: 'error' })
export class LogError extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'message' })
  message: string;

  @Column({ name: 'host' })
  host: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'stack' })
  stack: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
