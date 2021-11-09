import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ database: 'main', schema: 'dbo', name: 'plan' })
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'duration' })
  duration: number;

  @Column({
    name: 'created_by',
    default: () => 'CURRENT_USER',
    select: false
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    select: false
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false
  })
  updatedAt: Date;
}