import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { Form } from '../form/form.entity';
import { GridType } from '../grid/grid-type.entity';

import { ObjectEntity } from '../object/object.entity';

interface FieldData { };

@Entity({ database: 'main', schema: 'org', name: 'field' })
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'role' })
  role: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'value' })
  value: string;

  @Column({ name: 'data', type: 'jsonb' })
  data: FieldData;

  @Column({ name: 'map' })
  map: string;

  @Column({ name: 'lookup' })
  lookup: string;

  @Column({ name: 'is_required' })
  isRequired: boolean;

  @ManyToOne(() => GridType)
  @JoinColumn({ name: 'grid_type_id', referencedColumnName: 'id' })
  gridType: GridType;

  @ManyToMany(() => Form, (form: Form) => form.fields)
  forms: Form[];

  @Column({ name: 'object_id' })
  objectId: boolean;

  @Column({ name: 'org_id' })
  orgId: boolean;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
