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

export enum RoleTypeEnum {
  SYSTEM = 'system',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

@Entity({ database: 'c_main', schema: 'dbo', name: 'role_type' })
export class RoleType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: RoleTypeEnum,
  })
  name: RoleTypeEnum;
}

@Entity({ database: 'c_main', schema: 'sec', name: 'role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'is_owner' })
  isOwner: boolean;

  @ManyToOne(() => RoleType, (role_type) => role_type.id)
  @JoinColumn({ name: 'role_type_id' })
  roleType: RoleType;

  @ManyToMany(() => Policy, (policy: Policy) => policy.roles)
  @JoinTable({
    name: 'role_policy',
    joinColumn: {
      name: 'role_id',
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

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
