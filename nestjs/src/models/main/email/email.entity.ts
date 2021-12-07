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

@Entity({ database: 'c_main', schema: 'dbo', name: 'email_address' })
export class EmailAddress {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'group_name' })
  groupName: string;

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

@Entity({ database: 'c_main', schema: 'dbo', name: 'email_from' })
export class EmailFrom {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'from_name' })
  fromName: string;

  @Column({ name: 'from_address' })
  fromAddress: string;

  @Column({ name: 'reply_to' })
  replyTo: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => EmailType, (email_type) => email_type.emailFromId)
  emailTypes: EmailType[];
}

@Entity({ database: 'c_main', schema: 'dbo', name: 'email_type' })
export class EmailType {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'type_name',
    type: 'enum',
    enum: EmailTypeEnum,
  })
  typeName: EmailTypeEnum;

  @Column({ name: 'type' })
  type: string;

  @ManyToOne(() => EmailAddress, (emailAddress) => emailAddress.emailTypes)
  @JoinColumn({ name: 'email_address_id' })
  emailAddressId: EmailAddress;

  @ManyToOne(() => EmailFrom, (emailFrom) => emailFrom.emailTypes)
  @JoinColumn({ name: 'email_from_id' })
  emailFromId: EmailFrom;

  @ManyToOne(() => Module, (module) => module.id)
  @JoinColumn({ name: 'module_id' })
  moduleId: Module;

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

@Entity({ database: 'c_main', schema: 'org', name: 'email' })
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
