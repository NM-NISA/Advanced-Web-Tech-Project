import {
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AdminService } from './admin.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  @Get('jobs')
  getAllJobs() {
    return this.adminService.getAllJobs();
  }

  @Delete('jobs/:id')
  deleteJob(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteJob(id);
  }

  @Get('applications')
  getAllApplications() {
    return this.adminService.getAllApplications();
  }

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }
}