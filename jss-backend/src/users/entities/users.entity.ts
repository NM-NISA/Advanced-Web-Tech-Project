import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Job } from '../../jobs/entities/jobs.entity';
import { Application } from '../../applications/entities/applications.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Job, (job) => job.employer)
  jobs: Job[];

  @OneToMany(() => Application, (app) => app.user)
  applications: Application[];
}