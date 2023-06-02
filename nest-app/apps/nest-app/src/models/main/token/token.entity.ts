import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ database: 'db_checkin', schema: 'main_sec', name: 'token' })
export class Token extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'token_type' })
  tokenType: string;

  @Column({ name: 'token_key' })
  tokenKey: string;

  @Column({ name: 'data', type: 'json' })
  data: string;

  @Column({ name: 'expired_at', type: 'bigint' })
  expiredAt: number;
}
