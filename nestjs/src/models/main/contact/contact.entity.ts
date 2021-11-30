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

@Entity({ database: 'main', schema: 'org', name: 'contact' })
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'first_name',
    length: 45,
    nullable: true
  })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 45,
    nullable: true
  })
  lastName: string;

  @Column({
    name: 'email_address',
    length: 45,
    nullable: true
  })
  emailAddress: string;

  @Column({
    name: 'street_address',
    length: 95,
    nullable: true
  })
  streetAddress: string;

  @Column({
    name: 'city',
    length: 95,
    nullable: true
  })
  city: string;

  @Column({
    name: 'postal_code',
    nullable: true
  })
  postalCode: number;

  @OneToOne(() => Territory, (territory) => territory.id, { nullable: true })
  @JoinColumn({ name: 'territory_id' })
  territory: Territory;

  @Column({
    name: 'phone_number',
    length: 20,
    nullable: true
  })
  phoneNumber: string;

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
    nullable: true,
    select: false,
  })
  updatedAt: Date;
}
