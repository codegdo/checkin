import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { FormType } from '../form/form-type.entity';
import { View } from '../view/view.entity';


@Entity({ database: 'main', schema: 'dbo', name: 'object' })
export class ObjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'is_external' })
  isExternal: boolean;

  @Column({ name: 'is_internal' })
  isInternal: boolean;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @ManyToMany(() => View, (view: View) => view.objects)
  views: View[];

  @ManyToMany(() => FormType, (formType: FormType) => formType.objects)
  formTypes: FormType[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
