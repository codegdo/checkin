import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';


@Entity({ database: 'main', schema: 'sec', name: 'token' })
@Unique(['key'])
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'key' })
  key: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'data', type: 'jsonb' })
  data: any;

  @Column({ name: 'expired_at' })
  expiredAt: number;
}
