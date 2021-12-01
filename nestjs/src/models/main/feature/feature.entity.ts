import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Module } from '../module/module.entity';

@Entity({ database: 'main', schema: 'dbo', name: 'feature' })
export class Feature extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price' })
  price: number;

  // Use middle table to join
  @ManyToMany(() => Module, (module: Module) => module.features)
  @JoinTable({
    name: 'feature_module',
    joinColumn: {
      name: 'feature_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'module_id',
      referencedColumnName: 'id',
    },
  })
  modules: Module[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
