import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Application } from './entities/applications.entity';

import { Job } from '../jobs/entities/jobs.entity';

import { User } from '../users/entities/users.entity';

import { CreateApplicationDto } from './dto/create-application.dto';

import { UpdateApplicationDto } from './dto/update-application.dto';

import { MailService } from '../mail/mail.service';

@Injectable()
export class ApplicationsService {
  constructor(
  @InjectRepository(Application)
  private applicationRepo: Repository<Application>,

  @InjectRepository(Job)
  private jobRepo: Repository<Job>,

  private mailService: MailService,
) {}

async apply(
  createDto: CreateApplicationDto,
  user: User,
  cvFile: string,
) {
  const job = await this.jobRepo.findOne({
    where: { id: createDto.jobId },
    relations: ['employer'],
  });

  if (!job) {
    throw new NotFoundException('Job not found');
  }

  const existingApplication =
    await this.applicationRepo.findOne({
      where: {
        job: { id: createDto.jobId },
        user: { id: user.id },
      },
      relations: ['job', 'user'],
    });

  if (existingApplication) {
    throw new BadRequestException(
      'You already applied to this job',
    );
  }

  const application = this.applicationRepo.create({
    job,
    user,
    status: 'pending',
    cv_file: cvFile,
  });

  const savedApplication =
  await this.applicationRepo.save(application);

  await this.mailService.sendApplicationSuccessEmail(
    user.email,
    job.title,
  );

  await this.mailService.notifyEmployer(
    job.employer.email,
    user.full_name,
    job.title,
  );

  return savedApplication;
}

  async myApplications(user: User) {
    return this.applicationRepo.find({
      where: {
        user: { id: user.id },
      },
      relations: ['job'],
    });
  }

  async applicants(jobId: number, employer: User) {
    const job = await this.jobRepo.findOne({
      where: { id: jobId },
      relations: ['employer'],
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.employer.id !== employer.id) {
      throw new ForbiddenException(
        'You can view only your own job applicants',
      );
    }

    return this.applicationRepo.find({
      where: {
        job: { id: jobId },
      },
      relations: ['user', 'job'],
    });
  }

  async updateStatus(
    applicationId: number,
    updateDto: UpdateApplicationDto,
    employer: User,
  ) {
    const application =
      await this.applicationRepo.findOne({
        where: { id: applicationId },
        relations: [
          'job',
          'job.employer',
          'user',
        ],
      });

    if (!application) {
      throw new NotFoundException(
        'Application not found',
      );
    }

    if (
      application.job.employer.id !== employer.id
    ) {
      throw new ForbiddenException(
        'You can update only your own job applications',
      );
    }

    application.status = updateDto.status;

    const updatedApplication =
    await this.applicationRepo.save(application);

    await this.mailService.sendStatusUpdateEmail(
      application.user.email,
      application.status,
      application.job.title,
    );

    return updatedApplication;
  }
}