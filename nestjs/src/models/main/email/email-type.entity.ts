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
import { EmailAddress } from './email-address.entity';
import { EmailFrom } from './email-from.entity';
import { Email } from './email.entity';

export enum EmailTypeEnum {
  SENDER = 'S',
  RECEIVER = 'R'
}

@Entity({ database: 'main', schema: 'dbo', name: 'email_type' })
export class EmailType {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: EmailTypeEnum,
  })
  type: EmailTypeEnum;

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