import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ database: 'main', schema: 'sec', name: 'business' })
@Unique(['subdomain'])
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'name', nullable: true })
  name!: string;

  @Column({ name: 'street_address', nullable: true })
  streetAddress!: string;

  @Column({ name: 'city', nullable: true })
  city!: string;

  @Column({ name: 'postal_code', nullable: true })
  postalCode!: number;

  @Column({ name: 'territory_id', nullable: true })
  territoryId!: number;

  @Column({ name: 'website', nullable: true })
  website!: string;

  @Column({ name: 'phone', nullable: true })
  phone!: number;

  @Column({ name: 'fax', nullable: true })
  fax!: number;

  @Column({ name: 'subdomain', nullable: false })
  subdomain!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner!: User;
}
