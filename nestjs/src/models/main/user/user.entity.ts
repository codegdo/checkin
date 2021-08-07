import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Entity({ database: 'main', schema: 'sec', name: 'user' })
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email_address' })
  emailAddress: string;

  @Column({ name: 'is_new_password', default: false })
  isNewPassword!: boolean;

  @Column({ name: 'is_active', default: false })
  isActive!: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = randomBytes(8).toString('hex');
    const hash = await (scrypt(this.password, salt, 32)) as Buffer;
    this.password = hash.toString('hex') + '.' + salt;
  }

  async validatePassword(password: string) {
    const [hashPassword, salt] = this.password.split('.');
    const hash = await (scrypt(password, salt, 32)) as Buffer;
    return hashPassword === hash.toString('hex');
  }
}