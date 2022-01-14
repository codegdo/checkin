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
} from 'typeorm';

@Entity({ database: 'main', schema: 'org', name: 'subscription_audit' })
export class SubscriptionAudit extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'subscription_id' })
  subscriptionId: number;

  @Column({ name: 'subscription_plan_id' })
  subscriptionPlanId: number;

  @Column({ name: 'workspace_id' })
  workspaceId: number;

  @Column({ name: 'org_id' })
  orgId: number;

  @Column({ name: 'operation' })
  operation: string;

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

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
