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

  @Column({ name: 'biz_id' })
  bizId: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  // join table
  @ManyToMany(() => Field, (field: Field) => field.forms)
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
