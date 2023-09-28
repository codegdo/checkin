import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class MigrationCategory {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;
  
    @Column({ type: 'varchar', length: 50, default: () => 'CURRENT_USER' })
    created_by: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    updated_by: string;
  }
  