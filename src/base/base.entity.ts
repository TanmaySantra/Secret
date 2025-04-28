import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'active', type: 'boolean', default: true })
  active?: boolean;
}
