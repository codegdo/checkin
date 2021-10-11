import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Policy } from '../policy/policy.entity';

export enum RoleTypeEnum {
  SYSTEM = 'system',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

@Entity({ database: 'main', schema: 'dbo', name: 'role_type' })
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

@Entity({ database: 'main', schema: 'sec', name: 'role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'is_owner', default: false })
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

  @Column({ name: 'org_id', nullable: true })
  orgId!: number;
}
