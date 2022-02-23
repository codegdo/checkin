import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Client, User, Territory } from '../entities';

@Entity({ database: 'main', schema: 'org', name: 'store' })
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

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

  @Column({ name: 'fax_number' })
  faxNumber: string;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @Column({ name: 'biz_id' })
  bizId: number;

  @ManyToMany(() => Client, (client: Client) => client.stores)
  clients: Client[];

  @ManyToMany(() => User, (user: User) => user.stores)
  users: User[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
