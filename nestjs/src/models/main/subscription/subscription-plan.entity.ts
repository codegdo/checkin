import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PlanTypeEnum {
  MONTHLY = 'monthly',
  SEMIANNUAL = 'semiannual',
  ANNUAL = 'annual',
}

@Entity({ database: 'main', schema: 'dbo', name: 'subscription_plan' })
export class SubscriptionPlan extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: PlanTypeEnum,
  })
  name: PlanTypeEnum;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'duration' })
  duration: number;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
