import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Form } from './form.entity';

export enum FormTypeEnum {
  USER = 'user',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

@Entity({ database: 'main', schema: 'org', name: 'form_field' })
export class FormField extends BaseEntity {
  @Column()
  isActive: boolean;

  @JoinColumn('form_id')
  @ManyToOne((type) => Form, (form) => form.formField, { primary: true })
  form: Form;

  @JoinColumn('group_id')
  @ManyToOne((type) => Group, (group) => group.userGroups, { primary: true })
  group: Group;
}
