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

  @Column({ name: 'data' })
  data: string;

  @Column({ name: 'is_required', default: false })
  isRequired: boolean;

  @ManyToOne(() => DBObject)
  @JoinColumn({ name: 'object_id', referencedColumnName: 'id' })
  object: DBObject;

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    default: () => 'CURRENT_USER',
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
