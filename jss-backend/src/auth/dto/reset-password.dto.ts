import {
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @MinLength(6)
  newPassword: string;
}