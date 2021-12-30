import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'checkin', schema: 'org', name: 'workspace' })
export class Workspace {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'location_id' })
  locationId: number;

  @Column({ name: 'org_id' })
  orgId: number;
}