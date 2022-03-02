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
import { Component } from '../component/component.entity';

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

  @Column({ name: 'has_dependent' })
  hasDependent: boolean;

  @Column({ name: 'is_dependent' })
  isDependent: boolean;

  @ManyToOne(() => Component)
  @JoinColumn({ name: 'component_id', referencedColumnName: 'id' })
  component: Component;

  @ManyToMany(() => Form, (form: Form) => form.fields)
  forms: Form[];

  @Column({ name: 'object_id' })
  objectId: number;

  @Column({ name: 'org_id' })
  orgId: number;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
