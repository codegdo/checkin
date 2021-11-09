import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  //ManyToOne,
  JoinColumn,
  OneToOne,
  //OneToMany,
} from 'typeorm';
import { Feature } from '../feature/feature.entity';
import { Page } from '../page/page.entity';

@Entity({ database: 'main', schema: 'dbo', name: 'module_group' })
export class ModuleGroup extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    default: () => 'CURRENT_USER',
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

@Entity({ database: 'main', schema: 'dbo', name: 'module' })
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  //@ManyToOne(() => ModuleGroup)
  //@JoinColumn({ name: 'module_group_id', referencedColumnName: 'id' })
  //moduleGroup: ModuleGroup;

  @OneToOne(() => ModuleGroup, (moduleGroup) => moduleGroup.id)
  @JoinColumn({ name: 'module_group_id' })
  moduleGroup: ModuleGroup;

  @ManyToMany(() => Feature, (feature: Feature) => feature.modules)
  features: Feature[];

  @Column({ name: 'is_external', default: false })
  isExternal: boolean;

  @Column({ name: 'is_internal', default: false })
  isInternal: boolean;

  @Column({ name: 'is_subscription', default: false })
  isSubscription: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  //@OneToMany(() => Page, page => page.module)
  //pages!: Page[];

  // Use middle table to join
  @ManyToMany(() => Page, (page: Page) => page.modules)
  @JoinTable({
    name: 'module_page',
    joinColumn: {
      name: 'module_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'page_id',
      referencedColumnName: 'id',
    },
  })
  pages: Page[];

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
    select: false
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    select: false
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false
  })
  updatedAt: Date;
}
