import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  adminRoute() {
    return {
      message: 'Welcome Admin',
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employer')
  @Get('employer')
  employerRoute() {
    return {
      message: 'Welcome Employer',
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('jobseeker')
  @Get('jobseeker')
  jobseekerRoute() {
    return {
      message: 'Welcome Job Seeker',
    };
  }
}