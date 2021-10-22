import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'checkin', schema: 'org', name: 'calendar' })
export class Calendar {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'location_id', nullable: true })
  locationId: number;

  @Column({ name: 'org_id', nullable: true })
  orgId: number;
}