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

@Entity({ database: 'main', schema: 'dbo', name: 'email_from' })
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