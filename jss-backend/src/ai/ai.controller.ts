import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { ResumeAnalysis } from './interfaces/resume-analysis.interface';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze-resume')
  async analyzeResume(
    @Body('cvPath') cvPath: string,
    @Body('jobDescription') jobDescription: string,
  ): Promise<ResumeAnalysis> {
    return this.aiService.analyzeResume(cvPath, jobDescription);
  }
}
