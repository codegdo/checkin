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

interface BizData { };

@Entity({ database: 'main', schema: 'sec', name: 'organization' })
@Unique(['subdomain'])
export class Organization extends BaseEntity {
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

  @Column({ name: 'territory_id' })
  territoryId: number;

  @Column({ name: 'website' })
  website: string;

  @Column({ name: 'phone_number' })
  phoneNumber: number;

  @Column({ name: 'fax_number' })
  faxNumber: number;

  @Column({ name: 'subdomain' })
  subdomain: string;

  @Column({ name: 'data', type: 'jsonb' })
  data: BizData;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
