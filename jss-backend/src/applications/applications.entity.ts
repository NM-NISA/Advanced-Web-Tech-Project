import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, job => job.applications)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => User, user => user.applications)
  @JoinColumn({ name: 'applicant_id' })
  user: User;

  @Column()
  status: string;
}