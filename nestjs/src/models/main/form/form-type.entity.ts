import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectEntity } from '../object/object.entity';

export enum FormTypeEnum {
  USER = 'user'
}

@Entity({ database: 'main', schema: 'dbo', name: 'form_type' })
export class FormType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: FormTypeEnum,
  })
  name: FormTypeEnum;

  @Column({ name: 'is_custom' })
  isCustom: boolean;

  // join table
  @ManyToMany(() => ObjectEntity, (object: ObjectEntity) => object.formTypes)
  @JoinTable({
    name: 'form_type_object',
    joinColumn: {
      name: 'form_type_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'object_id',
      referencedColumnName: 'id',
    },
  })
  objects: ObjectEntity[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
