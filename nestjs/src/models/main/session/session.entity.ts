import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ database: 'main', schema: 'sec', name: 'session' })
export class Session {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'json' })
  json: string;

  @Column({ name: 'expired_at', type: 'bigint' })
  expiredAt: number;
}