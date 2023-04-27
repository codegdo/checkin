import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

@Entity({ database: 'db_checkin', schema: 'main_sec', name: 'user' })
@Unique(['username'])
@Unique(['passcode'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'passcode' })
  passcode: string;

  @Column({ name: 'group_id' })
  groupId: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'is_reset_required' })
  isResetRequired: boolean;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
