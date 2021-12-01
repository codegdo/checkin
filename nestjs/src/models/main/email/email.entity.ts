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

import { Module } from '../module/module.entity';

export enum EmailTypeEnum {
  SIGNUP = 'signup',
}

@Entity({ database: 'main', schema: 'dbo', name: 'email_address' })
export class EmailAddress {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'recipients' })
  recipients: string;

  @Column({ name: 'cc_recipients' })
  ccRecipients: string;

  @Column({ name: 'bcc_recipients' })
  bccRecipients: string;

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


@Entity({ database: 'main', schema: 'dbo', name: 'email_type' })
export class EmailType {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: EmailTypeEnum,
  })
  name: EmailTypeEnum;

  @Column({ name: 'type' })
  type: string;

  @ManyToOne(() => Module, (module) => module.id)
  @JoinColumn({ name: 'module_id' })
  moduleId: Module;

  @ManyToOne(() => EmailAddress, (emailAddress) => emailAddress.emailTypes)
  @JoinColumn({ name: 'email_address_id' })
  emailAddressId: EmailAddress;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Email, (email) => email.emailTypeId)
  emails: Email[];
}

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
