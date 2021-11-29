import { Column, Entity, PrimaryColumn } from "typeorm";
import { ISession } from 'connect-typeorm';

@Entity({ database: 'main', schema: 'sec', name: 'session' })
export class Session implements ISession {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'json', nullable: true })
  json: string;

  @Column({ name: 'expired_at', type: 'bigint', nullable: true })
  expiredAt: number;
}