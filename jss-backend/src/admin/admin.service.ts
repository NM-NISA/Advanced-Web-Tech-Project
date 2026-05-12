import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../users/entities/users.entity';

import { Job } from '../jobs/entities/jobs.entity';

import { Application } from '../applications/entities/applications.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Job)
    private jobRepo: Repository<Job>,

    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,
  ) {}

  getAllUsers() {
    return this.userRepo.find();
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.remove(user);

    return { message: 'User deleted successfully' };
  }

  getAllJobs() {
    return this.jobRepo.find({
      relations: ['employer'],
    });
  }

  async deleteJob(id: number) {
    const job = await this.jobRepo.findOne({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    await this.jobRepo.remove(job);

    return { message: 'Job deleted successfully' };
  }

  getAllApplications() {
    return this.applicationRepo.find({
      relations: ['job', 'user'],
    });
  }

  async getStats() {
    const users = await this.userRepo.count();

    const jobs = await this.jobRepo.count();

    const applications =
      await this.applicationRepo.count();

    return {
      totalUsers: users,
      totalJobs: jobs,
      totalApplications: applications,
    };
  }
}