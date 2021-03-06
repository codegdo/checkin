import { Column, Entity, PrimaryColumn } from 'typeorm';

import { ISession } from 'src/common';

@Entity({ database: 'main', schema: 'sec', name: 'session' })
export class Session implements ISession {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'json' })
  json: string;

  @Column({ name: 'expired_at', type: 'bigint' })
  expiredAt: number;
}
