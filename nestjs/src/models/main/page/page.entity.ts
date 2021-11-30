import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  //JoinColumn,
  //ManyToOne
} from 'typeorm';
import { Module } from '../module/module.entity';

@Entity({ database: 'main', schema: 'dbo', name: 'page' })
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    length: 45,
    nullable: false
  })
  name: string;

  @Column({
    name: 'type',
    length: 45,
    nullable: true
  })
  type: string;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_external', default: false })
  isExternal: boolean;

  @Column({ name: 'is_internal', default: false })
  isInternal: boolean;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @ManyToMany(() => Module, (module: Module) => module.pages, { nullable: true })
  modules: Module[];

  //@ManyToOne(() => Module)
  //@JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
  //module!: Module;

  @Column({
    name: 'created_by',
    length: 45,
    default: () => 'CURRENT_USER'
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    length: 45,
    nullable: true
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;
}
