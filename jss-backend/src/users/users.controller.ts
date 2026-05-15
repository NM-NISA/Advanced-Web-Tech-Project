import {
  Body,
  Controller,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {

    constructor(
      private usersService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateProfile(
      @Request() req,
      @Body() updateDto: UpdateProfileDto,
    ) {
      return this.usersService.updateProfile(
        req.user.id,
        updateDto,
      );
    }

}