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

  @Column({
    name: 'message',
    length: 255,
    nullable: true
  })
  message: string;

  @Column({
    name: 'host',
    length: 45,
    nullable: true
  })
  host: string;

  @Column({
    name: 'url',
    length: 45,
    nullable: true
  })
  url: string;

  @Column({
    name: 'stack',
    type: 'text',
    nullable: true
  })
  stack: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
