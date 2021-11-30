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
import { Role, Contact, Location } from '../entities';

const scrypt = promisify(_scrypt);

@Entity({ database: 'main', schema: 'sec', name: 'user' })
@Unique(['username'])
@Unique(['passcode'])
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'username',
    length: 45,
  })
  username: string;

  @Column({
    name: 'password',
    length: 85,
    select: false
  })
  password: string;

  @Column({
    name: 'passcode',
    length: 4,
    nullable: true,
    select: false
  })
  passcode: string;

  @Column({ name: 'is_new_password', default: false })
  isNewPassword: boolean;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @OneToOne(() => Contact, (contact) => contact.id, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @ManyToOne(() => Role, (role) => role.id, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'form_id', nullable: true })
  formId: number;

  @Column({ name: 'org_id', nullable: true })
  orgId: number;

  @ManyToMany(() => Location, (location: Location) => location.users, { nullable: true })
  @JoinTable({
    name: 'user_location',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'location_id',
      referencedColumnName: 'id',
    },
  })
  locations: Location[];

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
    length: 45,
    select: false,
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    nullable: true,
    length: 45,
    select: false,
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    select: false,
  })
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
