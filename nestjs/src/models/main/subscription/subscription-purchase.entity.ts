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
import { Subscription } from './subscription.entity';

@Entity({ database: 'main', schema: 'org', name: 'subscription_purchase' })
export class SubscriptionPurchase extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => Subscription, (subscription) => subscription.id)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @Column({ name: 'org_id' })
  orgId: number;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
