import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ database: 'db_checkin', schema: 'main_sec', name: 'company' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column({ name: 'territory_id' })
  territoryId: number;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'postal_code' })
  postal_code: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'website' })
  website: string;

  @Column({ name: 'num_employees' })
  numEmployees: number;

  @Column({ name: 'num_locations' })
  numLocations: number;

  @Column({ name: 'business_id' })
  businessId: number;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
