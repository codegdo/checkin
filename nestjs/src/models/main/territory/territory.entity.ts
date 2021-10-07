import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';


@Entity({ database: 'main', schema: 'dbo', name: 'territory' })
export class Territory extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'country', nullable: false })
  Country: string;

  @Column({ name: 'country_code', nullable: false })
  countryCode: string;

  @Column({ name: 'state', nullable: false })
  State: string;

  @Column({ name: 'state_code', nullable: false })
  stateCode: string;

  @Column({ name: 'region', nullable: false })
  region: string;

}
