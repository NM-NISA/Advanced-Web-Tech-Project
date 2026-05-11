import { Type } from 'class-transformer';

import { IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @Type(() => Number)
  @IsNumber()
  jobId: number;
}