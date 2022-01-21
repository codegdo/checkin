import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Field } from '../field/field.entity';
import { FormField } from './form-field.entity';

import { FormType } from './form-type.entity';

@Entity({ database: 'main', schema: 'org', name: 'form' })
export class Form extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @ManyToOne(() => FormType, (formType) => formType.id)
  @JoinColumn({ name: 'form_type_id' })
  formType: FormType;

  @Column({ name: 'org_id' })
  orgId: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @OneToMany((type) => FormField, (formField) => formField.form)
  formField: FormField[];

  // join table
  //https://github.com/typeorm/typeorm/issues/1224
  @ManyToMany((type) => Field, (field: Field) => field.forms)
  @JoinTable({
    name: 'form_field',
    joinColumn: {
      name: 'form_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'field_id',
      referencedColumnName: 'id',
    },
  })
  fields: Field[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
