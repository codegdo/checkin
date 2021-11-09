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

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'street_address', nullable: true })
  streetAddress: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'postal_code', nullable: true })
  postalCode: number;

  @OneToOne(() => Territory, (territory) => territory.id)
  @JoinColumn({ name: 'territory_id' })
  territory: Territory;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false
  })
  updatedAt: Date;
}
