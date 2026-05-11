import { IsIn, IsString } from 'class-validator';

export class UpdateApplicationDto {
  @IsString()
  @IsIn(['pending', 'accepted', 'rejected'])
  status: string;
}