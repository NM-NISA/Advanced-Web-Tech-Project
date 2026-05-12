import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/users.entity';

import { Job } from '../jobs/entities/jobs.entity';

import { Application } from '../applications/entities/applications.entity';

import { AdminController } from './admin.controller';

import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Job,
      Application,
    ]),
  ],

  controllers: [AdminController],

  providers: [AdminService],
})
export class AdminModule {}