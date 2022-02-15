import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Role } from '../role/role.entity';

interface PolicyStatement { }

@Entity({ database: 'main', schema: 'sec', name: 'policy' })
export class Policy extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'data', type: 'jsonb' })
  statement: PolicyStatement;

  @Column({ name: 'version_id' })
  versionId: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'org_id' })
  orgId: number;

  @ManyToMany(() => Role, (role: Role) => role.policies)
  roles: Role[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
