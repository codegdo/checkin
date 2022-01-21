import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum FormTypeEnum {
  USER = 'user',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
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
}
