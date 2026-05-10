import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/applications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
})
export class ApplicationsModule {}