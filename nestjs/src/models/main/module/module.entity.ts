import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Feature } from '../feature/feature.entity';
import { Page } from '../page/page.entity';

@Entity({ database: 'main', schema: 'dbo', name: 'module_group' })
export class ModuleGroup extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

@Entity({ database: 'main', schema: 'dbo', name: 'module' })
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'sort_order' })
  sortOrder: number;

  @ManyToOne(() => ModuleGroup)
  @JoinColumn({ name: 'module_group_id', referencedColumnName: 'id' })
  moduleGroup: ModuleGroup;

  //@ManyToOne(() => ModuleGroup, (moduleGroup) => moduleGroup.id)
  //@JoinColumn({ name: 'module_group_id' })
  //moduleGroup: ModuleGroup;

  @ManyToMany(() => Feature, (feature: Feature) => feature.modules)
  features: Feature[];

  @Column({ name: 'is_external' })
  isExternal: boolean;

  @Column({ name: 'is_internal' })
  isInternal: boolean;

  @Column({ name: 'is_subscription' })
  isSubscription: boolean;

  @Column({ name: 'is_active' })
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

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
