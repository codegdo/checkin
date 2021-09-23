import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'schedule', schema: 'org', name: 'calendar' })
export class Calendar {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;
}