import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import {
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

import { ApplicationsService } from './applications.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { CreateApplicationDto } from './dto/create-application.dto';

import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private applicationsService: ApplicationsService,
  ) {}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('jobseeker')
@Post()
@UseInterceptors(
  FileInterceptor('cv', {
    storage: diskStorage({
      destination: './uploads/cv',
      filename: (req, file, callback) => {
        const uniqueName =
          Date.now() + extname(file.originalname);

        callback(null, uniqueName);
      },
    }),

    limits: {
      fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, callback) => {
      if (file.mimetype !== 'application/pdf') {
        return callback(
          new BadRequestException(
            'Only PDF files are allowed',
          ),
          false,
        );
      }

      callback(null, true);
    },
  }),
)
apply(
  @Body() createDto: CreateApplicationDto,
  @Request() req,
  @UploadedFile() file: Express.Multer.File,
) {
  if (!file) {
    throw new BadRequestException(
      'CV PDF file is required',
    );
  }

  return this.applicationsService.apply(
    createDto,
    req.user,
    file.filename,
  );
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('jobseeker')
  @Get('my')
  myApplications(@Request() req) {
    return this.applicationsService.myApplications(
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employer')
  @Get('job/:jobId')
  applicants(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Request() req,
  ) {
    return this.applicationsService.applicants(
      jobId,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employer')
  @Patch(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateApplicationDto,
    @Request() req,
  ) {
    return this.applicationsService.updateStatus(
      id,
      updateDto,
      req.user,
    );
  }
}