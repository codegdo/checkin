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

  @OneToOne(() => Plan, (plan) => plan.id, { nullable: true })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column({ name: 'is_renewed', default: true })
  isRenewed: boolean;

  @Column({ name: 'is_trial', default: true })
  isTrial: boolean;

  @CreateDateColumn({
    name: 'start_date',
    type: 'timestamp',
  })
  startDate: Date;

  @CreateDateColumn({
    name: 'end_date',
    type: 'timestamp',
  })
  endDate: Date;

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
