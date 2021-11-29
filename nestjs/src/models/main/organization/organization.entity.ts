import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

interface OrgData { };

@Entity({ database: 'main', schema: 'sec', name: 'organization' })
@Unique(['subdomain'])
export class Organization extends BaseEntity {
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

  @Column({ name: 'territory_id', nullable: true })
  territoryId: number;

  @Column({ name: 'website', nullable: true })
  website: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: number;

  @Column({ name: 'fax_number', nullable: true })
  faxNumber: number;

  @Column({ name: 'subdomain', nullable: false })
  subdomain: string;

  @Column({ name: 'data', type: 'jsonb', nullable: true })
  data: OrgData;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

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
