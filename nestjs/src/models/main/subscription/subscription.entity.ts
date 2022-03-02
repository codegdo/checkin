import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Module } from '../module/module.entity';

import { SubscriptionPlan } from './subscription-plan.entity';

@Entity({ database: 'main', schema: 'org', name: 'subscription' })
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => SubscriptionPlan, (subscriptionPlan) => subscriptionPlan.id)
  @JoinColumn({ name: 'subscription_plan_id' })
  subscriptionPlan: SubscriptionPlan;

  @Column({ name: 'store_id' })
  storeId: number;

  @Column({ name: 'org_id' })
  orgId: number;

  @Column({ name: 'purchase_date' })
  purchaseDate: Date;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'is_renew' })
  isRenew: boolean;

  @Column({ name: 'is_trial' })
  isTrial: boolean;

  // Use middle table to join
  @ManyToMany(() => Module, (module: Module) => module.subscriptions)
  @JoinTable({
    name: 'subscription_module',
    joinColumn: {
      name: 'subscription_id',
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
