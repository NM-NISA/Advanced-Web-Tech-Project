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

import { FilterJobDto } from './dto/filter-job.dto';

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

  async findAll(filterDto: FilterJobDto) {
  const {
    title,
    location,
    minSalary,
    maxSalary,
    page = 1,
    limit = 5,
  } = filterDto;

  const query =
    this.jobRepo.createQueryBuilder('job');

  query.leftJoinAndSelect(
    'job.employer',
    'employer',
  );

  if (title) {
    query.andWhere(
      'LOWER(job.title) LIKE LOWER(:title)',
      {
        title: `%${title}%`,
      },
    );
  }

  if (location) {
    query.andWhere(
      'LOWER(job.location) LIKE LOWER(:location)',
      {
        location: `%${location}%`,
      },
    );
  }

  if (minSalary) {
    query.andWhere(
      'job.salary >= :minSalary',
      {
        minSalary,
      },
    );
  }

  if (maxSalary) {
    query.andWhere(
      'job.salary <= :maxSalary',
      {
        maxSalary,
      },
    );
  }

  query.skip((page - 1) * limit);

  query.take(limit);

  query.orderBy('job.id', 'DESC');

  const [jobs, total] =
    await query.getManyAndCount();

  return {
    total,

    page,

    limit,

    totalPages: Math.ceil(total / limit),

    jobs,
  };
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