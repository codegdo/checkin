import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Module } from '../module/module.entity';

@Entity({ database: 'main', schema: 'dbo', name: 'feature' })
export class Feature extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'price', nullable: true })
  price: number;

  // Use middle table to join
  @ManyToMany(() => Module, (module: Module) => module.features, { nullable: true })
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

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER'
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
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
