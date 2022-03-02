import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { EmailType } from './email-type.entity';

@Entity({ database: 'main', schema: 'org', name: 'email' })
export class Email {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'subject' })
  subject: string;

  @Column({ name: 'body' })
  body: string;

  @Column({ name: 'text' })
  text: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => EmailType, (emailType) => emailType.emails)
  @JoinColumn({ name: 'email_type_id' })
  emailTypeId: EmailType;

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
