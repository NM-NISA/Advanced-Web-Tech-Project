import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Job } from './entities/jobs.entity';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import { User } from '../users/entities/users.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepo: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, employer: User) {
    const job = this.jobRepo.create({
      ...createJobDto,
      employer,
    });

    return this.jobRepo.save(job);
  }

  async findAll() {
    return this.jobRepo.find({
      relations: ['employer'],
    });
  }

  async findOne(id: number) {
    const job = await this.jobRepo.findOne({
      where: { id },
      relations: ['employer'],
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async update(
    id: number,
    updateJobDto: UpdateJobDto,
    user: any,
  ) {
    const job = await this.findOne(id);

    if (job.employer.id !== user.id) {
      throw new ForbiddenException(
        'You can update only your own jobs',
      );
    }

    Object.assign(job, updateJobDto);

    return this.jobRepo.save(job);
  }

  async remove(id: number, user: any) {
    const job = await this.findOne(id);

    if (job.employer.id !== user.id) {
      throw new ForbiddenException(
        'You can delete only your own jobs',
      );
    }

    await this.jobRepo.remove(job);

    return {
      message: 'Job deleted successfully',
    };
  }
}