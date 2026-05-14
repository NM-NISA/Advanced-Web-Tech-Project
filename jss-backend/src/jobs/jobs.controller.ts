import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Patch,
  Request,
  UseGuards,
  Query
} from '@nestjs/common';

import { JobsService } from './jobs.service';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { FilterJobDto } from './dto/filter-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employer')
  @Post()
  create(
    @Body() createJobDto: CreateJobDto,
    @Request() req,
  ) {
    return this.jobsService.create(
      createJobDto,
      req.user,
    );
  }

  @Get()
  findAll(@Query() filterDto: FilterJobDto) {
    return this.jobsService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @Get('employer/my-jobs')
  @UseGuards(JwtAuthGuard)
  getEmployerJobs(
    @Request() req,
  ) {
    return this.jobsService.getEmployerJobs(
      req.user.id,
    );
  } 

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() dto: UpdateJobDto,
    @Request() req,
  ) {
    return this.jobsService.update(
      Number(id),
      dto,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employer')
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.jobsService.remove(id, req.user);
  }
}