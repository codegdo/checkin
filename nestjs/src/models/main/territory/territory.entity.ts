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

  @Column({
    name: 'country',
    length: 90,
    nullable: false
  })
  Country: string;

  @Column({
    name: 'country_code',
    length: 3,
    nullable: false
  })
  countryCode: string;

  @Column({
    name: 'state',
    length: 90,
    nullable: false
  })
  State: string;

  @Column({
    name: 'state_code',
    length: 2,
    nullable: false
  })
  stateCode: string;

  @Column({
    name: 'region',
    length: 45,
    nullable: false
  })
  region: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

}
