import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/jobs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
})
export class JobsModule {}