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

  @Column({
    name: 'name',
    length: 45,
    nullable: true
  })
  name: string;

  @Column({
    name: 'recipient',
    type: 'text',
    nullable: true
  })
  recipient: string;

  @Column({
    name: 'cc_recipient',
    type: 'text',
    nullable: true
  })
  ccRecipient: string;

  @Column({
    name: 'bcc_recipient',
    type: 'text',
    nullable: true
  })
  bccRecipient: string;

  @OneToMany(() => EmailType, (email_type) => email_type.emailAddressId, { nullable: true })
  emailTypes: EmailType[];

  @Column({
    name: 'created_by',
    length: 45,
    default: () => 'CURRENT_USER',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    length: 45,
    nullable: true
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;
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

  @Column({
    name: 'type',
    type: 'varchar',
    length: 1,
    nullable: true
  })
  type: string;

  @OneToMany(() => Email, (email) => email.emailTypeId, { nullable: true })
  emails: Email[];

  @ManyToOne(() => Module, (module) => module.id, { nullable: true })
  @JoinColumn({ name: 'module_id' })
  moduleId: Module;

  @ManyToOne(() => EmailAddress, (emailAddress) => emailAddress.emailTypes, { nullable: true })
  @JoinColumn({ name: 'email_address_id' })
  emailAddressId: EmailAddress;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 45,
    default: () => 'CURRENT_USER',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 45,
    nullable: true
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}

@Entity({ database: 'main', schema: 'org', name: 'email' })
export class Email {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 45,
    nullable: true
  })
  name: string;

  @Column({
    name: 'subject',
    type: 'varchar',
    length: 255,
    nullable: true
  })
  subject: string;

  @Column({
    name: 'body',
    type: 'text',
    nullable: true
  })
  body: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => EmailType, (emailType) => emailType.emails, { nullable: true })
  @JoinColumn({ name: 'email_type_id' })
  emailTypeId: EmailType;

  @Column({ name: 'org_id', nullable: true })
  orgId: number;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 45,
    default: () => 'CURRENT_USER',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 45,
    nullable: true
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;
}
