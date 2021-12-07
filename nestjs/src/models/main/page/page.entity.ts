import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { Module } from '../module/module.entity';

@Entity({ database: 'c_main', schema: 'dbo', name: 'page' })
export class Page extends BaseEntity {
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

  @ManyToMany(() => Module, (module: Module) => module.pages)
  modules: Module[];

  //@ManyToOne(() => Module)
  //@JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
  //module!: Module;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
