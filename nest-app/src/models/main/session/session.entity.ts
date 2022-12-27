import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
//import { ISession } from 'src/helpers/session/session-store.helper';

@Entity({ database: 'main', schema: 'sec', name: 'session' })
export class Session extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'json' })
  json: string;

  @Column({ name: 'expired_at', type: 'bigint' })
  expiredAt: number;
}
