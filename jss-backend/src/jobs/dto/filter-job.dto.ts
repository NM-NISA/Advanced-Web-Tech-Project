import { Type } from 'class-transformer';

import {
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class FilterJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minSalary?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxSalary?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 5;
}