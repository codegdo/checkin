import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ database: 'main', schema: 'dbo', name: 'plan' })
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'name',
    length: 45,
    nullable: true
  })
  name: string;

  @Column({
    name: 'duration',
    nullable: true
  })
  duration: number;

  @Column({
    name: 'created_by',
    length: 45,
    default: () => 'CURRENT_USER'
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    length: 45,
    nullable: true
  })
  updatedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updatedAt: Date;
}