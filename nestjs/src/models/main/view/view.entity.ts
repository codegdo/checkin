import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Module } from '../module/module.entity';
import { ObjectEntity } from '../object/object.entity';

@Entity({ database: 'main', schema: 'dbo', name: 'view' })
export class View extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'sort_order' })
  sortOrder: number;

  @Column({ name: 'is_external' })
  isExternal: boolean;

  @Column({ name: 'is_internal' })
  isInternal: boolean;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @ManyToMany(() => Module, (module: Module) => module.views)
  modules: Module[];

  // Use middle table to join
  @ManyToMany(() => ObjectEntity, (object: ObjectEntity) => object.views)
  @JoinTable({
    name: 'view_object',
    joinColumn: {
      name: 'view_id',
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
