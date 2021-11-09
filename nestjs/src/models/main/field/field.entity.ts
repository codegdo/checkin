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

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ type: 'jsonb', name: 'data' })
  data: FieldData;

  @Column({ name: 'is_required', default: false })
  isRequired: boolean;

  @ManyToOne(() => DBObject)
  @JoinColumn({ name: 'object_id', referencedColumnName: 'id' })
  object: DBObject;

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
    select: false
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    select: false
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false
  })
  updatedAt: Date;
}
