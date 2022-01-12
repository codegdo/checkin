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

@Entity({ database: 'main', schema: 'dbo', name: 'email_address' })
export class EmailAddress {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'recipient' })
  recipient: string;

  @Column({ name: 'cc_recipient' })
  ccRecipient: string;

  @Column({ name: 'bcc_recipient' })
  bccRecipient: string;

  @Column({ name: 'sms_recipient' })
  sms_Recipient: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => EmailType, (email_type) => email_type.emailAddressId)
  emailTypes: EmailType[];
}