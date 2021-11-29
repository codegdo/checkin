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

  @Column({ name: 'message', nullable: true })
  message: string;

  @Column({ name: 'host', nullable: true })
  host: string;

  @Column({ name: 'url', nullable: true })
  url: string;

  @Column({ name: 'stack', nullable: true })
  stack: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
