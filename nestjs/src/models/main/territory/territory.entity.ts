import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';


@Entity({ database: 'main', schema: 'dbo', name: 'territory' })
export class Territory extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'country' })
  Country: string;

  @Column({ name: 'country_code' })
  countryCode: string;

  @Column({ name: 'state' })
  State: string;

  @Column({ name: 'state_code' })
  stateCode: string;

  @Column({ name: 'region' })
  region: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

}
