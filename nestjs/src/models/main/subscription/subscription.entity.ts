import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Module } from '../module/module.entity';
import { Plan } from '../plan/plan.entity';

@Entity({ database: 'main', schema: 'org', name: 'subscription' })
export class Subscription extends BaseEntity {
  @OneToOne(() => Module, (module) => module.id, { primary: true })
  @JoinColumn({ name: 'module_id' })
  module!: Module;

  @PrimaryColumn({ name: 'org_id', primary: true })
  orgId: number;

  @OneToOne(() => Plan, (plan) => plan.id)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column({ name: 'is_renewed' })
  isRenewed: boolean;

  @Column({ name: 'is_trial' })
  isTrial: boolean;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
