import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/users.entity';
import { Application } from '../../applications/entities/applications.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  salary: number;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({ name: 'employer_id' })
  employer: User;

  @OneToMany(() => Application, (app) => app.job)
  applications: Application[];
}