import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

export enum GroupTypeEnum {
  SYSTEM = 'system',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

@Entity({ database: 'main', schema: 'dbo', name: 'group_type' })
export class GroupType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: GroupTypeEnum,
  })
  name: GroupTypeEnum;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}