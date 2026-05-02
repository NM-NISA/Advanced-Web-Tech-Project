import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @OneToMany(() => Job, job => job.employer)
  jobs: Job[];

  @OneToMany(() => Application, app => app.user)
  applications: Application[];
}