import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Client, User, Territory } from '../entities';

@Entity({ database: 'main', schema: 'org', name: 'location' })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'street_address', nullable: true })
  streetAddress: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'postal_code', nullable: true })
  postalCode: number;

  @OneToOne(() => Territory, (territory) => territory.id, { nullable: true })
  @JoinColumn({ name: 'territory_id' })
  territory: Territory;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'fax_number', nullable: true })
  faxNumber: string;

  @Column({ name: 'owner_id', nullable: true })
  ownerId: number;

  @Column({ name: 'org_id', nullable: true })
  orgId: number;

  @ManyToMany(() => Client, (client: Client) => client.locations, { nullable: true })
  clients: Client[];

  @ManyToMany(() => User, (user: User) => user.locations, { nullable: true })
  users: User[];

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER'
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
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;
}
