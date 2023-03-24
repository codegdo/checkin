import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ database: 'db_checkin', schema: 'main_sec', name: 'session' })
export class Session extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'data', type: 'json' })
  data: string;

  @Column({ name: 'expired_at', type: 'bigint' })
  expiredAt: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  //@Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
