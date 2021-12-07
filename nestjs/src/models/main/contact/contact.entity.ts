import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Territory } from '../territory/territory.entity';

@Entity({ database: 'c_main', schema: 'org', name: 'contact' })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email_address' })
  emailAddress: string;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'postal_code' })
  postalCode: number;

  @OneToOne(() => Territory, (territory) => territory.id)
  @JoinColumn({ name: 'territory_id' })
  territory: Territory;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
