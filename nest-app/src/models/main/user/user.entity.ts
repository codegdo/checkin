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
} from 'typeorm';

@Entity({ database: 'checkin', schema: 'main.sec', name: 'user' })
@Unique(['username'])
@Unique(['passcode'])
export class User {
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

  @Column({ name: 'contact_id' })
  contactId: number;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'is_new_password' })
  isNewPassword: boolean;

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
