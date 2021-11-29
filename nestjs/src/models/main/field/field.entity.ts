import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { DBObject } from '../object/object.entity';

interface FieldData { };

@Entity({ database: 'main', schema: 'dbo', name: 'field' })
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'role', nullable: true })
  role: string;

  @Column({ name: 'type', nullable: true })
  type: string;

  @Column({ type: 'jsonb', name: 'data', nullable: true })
  data: FieldData;

  @Column({ name: 'is_required', default: false })
  isRequired: boolean;

  @ManyToOne(() => DBObject, { nullable: true })
  @JoinColumn({ name: 'object_id', referencedColumnName: 'id' })
  object: DBObject;

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER'
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    nullable: true
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;
}
