import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectEntity } from '../object/object.entity';

export enum ComponentTypeEnum {
  USER_GROUP_GRID = 'user_group_grid'
}

@Entity({ database: 'main', schema: 'dbo', name: 'grid_type' })
export class Component extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: ComponentTypeEnum,
  })
  name: ComponentTypeEnum;

  @Column({ name: 'is_remove' })
  isRemove: boolean;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
