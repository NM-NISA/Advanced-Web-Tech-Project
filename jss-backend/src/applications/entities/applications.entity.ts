import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Job } from '../../jobs/entities/jobs.entity';
import { User } from '../../users/entities/users.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'applicant_id' })
  user: User;

  @Column({ default: 'pending' })
  status: string;
}