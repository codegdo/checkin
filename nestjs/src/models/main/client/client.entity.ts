import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Location } from '../entities';

@Entity({ database: 'main', schema: 'sec', name: 'client' })
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ name: 'email_address' })
  emailAddress: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'birthday' })
  birthday: Date;

  @ManyToMany(() => Location, (location: Location) => location.clients)
  @JoinTable({
    name: 'client_location',
    joinColumn: {
      name: 'client_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'location_id',
      referencedColumnName: 'id',
    },
  })
  locations: Location[];

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
