import { BaseEntity, Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TokenData } from '../interfaces';

@Entity({ database: 'main', schema: 'sec', name: 'token' })
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'expired_at' })
  expiredAt: number;

  @Column({ type: 'jsonb', name: 'data' })
  data?: TokenData;

}
