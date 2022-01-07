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
import { View } from '../view/view.entity';

@Entity({ database: 'main', schema: 'dbo', name: 'module' })
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'sort_order' })
  sortOrder: number;

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
  @ManyToMany(() => View, (view: View) => view.modules)
  @JoinTable({
    name: 'module_view',
    joinColumn: {
      name: 'module_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'view_id',
      referencedColumnName: 'id',
    },
  })
  views: View[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
