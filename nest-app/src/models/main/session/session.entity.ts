import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ database: 'main', schema: 'sec', name: 'session' })
export class Session extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'data', type: 'json' })
  data: string;

  @Column({ name: 'expired_at', type: 'bigint' })
  expiredAt: number;
}
