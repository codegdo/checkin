import {
  BeforeInsert,
  BeforeUpdate,
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
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Group, Contact, Store } from '../entities';

const scrypt = promisify(_scrypt);

@Entity({ database: 'main', schema: 'sec', name: 'user' })
@Unique(['username'])
@Unique(['passcode'])
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'passcode', select: false })
  passcode: string;

  @Column({ name: 'is_new_password' })
  isNewPassword: boolean;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @OneToOne(() => Contact, (contact) => contact.id)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ name: 'form_id' })
  formId: number;

  @Column({ name: 'biz_id' })
  bizId: number;

  @ManyToMany(() => Store, (store: Store) => store.users)
  @JoinTable({
    name: 'user_store',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'store_id',
      referencedColumnName: 'id',
    },
  })
  stores: Store[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(this.password, salt, 32)) as Buffer;
      this.password = hash.toString('hex') + '.' + salt;
    }
  }

  async validatePassword(password: string) {
    const [hashPassword, salt] = this.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return hashPassword === hash.toString('hex');
  }
}
