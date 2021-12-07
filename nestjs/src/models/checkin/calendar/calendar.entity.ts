import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'c_checkin', schema: 'org', name: 'calendar' })
export class Calendar {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'location_id' })
  locationId: number;

  @Column({ name: 'org_id' })
  orgId: number;
}