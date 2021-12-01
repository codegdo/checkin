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

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'data', type: 'jsonb' })
  data: FieldData;

  @Column({ name: 'is_required' })
  isRequired: boolean;

  @ManyToOne(() => DBObject)
  @JoinColumn({ name: 'object_id', referencedColumnName: 'id' })
  object: DBObject;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
