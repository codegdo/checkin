import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Policy } from '../policy/policy.entity';
import { GroupType } from './group-type.entity';

@Entity({ database: 'main', schema: 'sec', name: 'group' })
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'group_level' })
  groupLevel: number;

  @Column({ name: 'is_owner' })
  isOwner: boolean;

  @ManyToOne(() => GroupType, (groupType) => groupType.id)
  @JoinColumn({ name: 'group_type_id' })
  groupType: GroupType;

  @ManyToMany(() => Policy, (policy: Policy) => policy.groups)
  @JoinTable({
    name: 'group_policy',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'policy_id',
      referencedColumnName: 'id',
    },
  })
  policies: Policy[];

  @Column({ name: 'org_id' })
  orgId: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
