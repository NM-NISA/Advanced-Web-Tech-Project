import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Application } from './entities/applications.entity';

import { Job } from '../jobs/entities/jobs.entity';

import { ApplicationsController } from './applications.controller';

import { ApplicationsService } from './applications.service';

import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      Job,
    ]),
    MailModule,
  ],

  controllers: [ApplicationsController],

  providers: [ApplicationsService],
})
export class ApplicationsModule {}