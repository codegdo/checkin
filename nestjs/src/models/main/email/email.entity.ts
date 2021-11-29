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
import { Recipient } from '../entities';
import { Module } from '../module/module.entity';

export enum EmailTypeEnum {
  SIGNUP = 'signup',
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

  @Column({ name: 'type', nullable: true })
  type: string;

  @OneToMany(() => Email, (email) => email.emailTypeId, { nullable: true })
  emails: Email[];

  @ManyToOne(() => Module, (module) => module.id, { nullable: true })
  @JoinColumn({ name: 'module_id' })
  moduleId: Module;

  @ManyToOne(() => Recipient, (recipient) => recipient.emailTypes, { nullable: true })
  @JoinColumn({ name: 'recipient_id' })
  recipientId: Recipient;

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
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

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'subject', nullable: true })
  subject: string;

  @Column({ name: 'body', nullable: true })
  body: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => EmailType, (email_type) => email_type.emails, { nullable: true })
  @JoinColumn({ name: 'email_type_id' })
  emailTypeId: EmailType;

  @Column({ name: 'org_id', nullable: true })
  orgId: number;

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
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
