import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  salary: number;

  @IsString()
  @IsNotEmpty()
  location: string;
}