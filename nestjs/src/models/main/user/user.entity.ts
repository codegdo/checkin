import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'main', schema: 'sec', name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email_address' })
  emailAddress: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;
}