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

  @Column({
    name: 'name',
    length: 225,
    nullable: false
  })
  name: string;

  @Column({
    name: 'description',
    length: 225,
    nullable: true
  })
  description: string;

  @Column({
    name: 'role',
    length: 15,
    nullable: true
  })
  role: string;

  @Column({
    name: 'type',
    length: 15,
    nullable: true
  })
  type: string;

  @Column({
    name: 'data',
    type: 'jsonb',
    nullable: true
  })
  data: FieldData;

  @Column({ name: 'is_required', default: false })
  isRequired: boolean;

  @ManyToOne(() => DBObject, { nullable: true })
  @JoinColumn({ name: 'object_id', referencedColumnName: 'id' })
  object: DBObject;

  @Column({
    name: 'created_by',
    length: 45,
    default: () => 'CURRENT_USER'
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    length: 45,
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
