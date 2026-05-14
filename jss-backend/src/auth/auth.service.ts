import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';

import { v4 as uuidv4 } from 'uuid';

import { UpdatePasswordDto } from './dto/update-password.dto';

import { ForgotPasswordDto } from './dto/forgot-password.dto';

import { ResetPasswordDto } from './dto/reset-password.dto';

import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,

    private mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser =
      await this.usersService.findByEmail(
        registerDto.email,
      );

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        registerDto.password,
        10,
      );

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const user =
      await this.usersService.findByEmail(
        loginDto.email,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const isMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token:
        this.jwtService.sign(payload),

      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    };
  }

  async getProfile(id: number) {
    const user = await this.usersService.findById(
      id,
    );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      role: user.role,
    };
  }

  async updatePassword(
    userId: number,
    updateDto: UpdatePasswordDto,
  ) {
    const user =
      await this.usersService.findById(
        userId,
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const isPasswordMatched =
      await bcrypt.compare(
        updateDto.currentPassword,
        user.password,
      );

    if (!isPasswordMatched) {
      throw new BadRequestException(
        'Current password incorrect',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        updateDto.newPassword,
        10,
      );

    user.password = hashedPassword;

    await this.usersService.save(user);

    return {
      message:
        'Password updated successfully',
    };
  }

  async forgotPassword(
    forgotDto: ForgotPasswordDto,
  ) {
    const user =
      await this.usersService.findByEmail(
        forgotDto.email,
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const resetToken = uuidv4();

    user.reset_token = resetToken;

    user.reset_token_expiry = new Date(
      Date.now() + 1000 * 60 * 15,
    );

    await this.usersService.save(user);

    const resetLink =
      `http://localhost:3000/auth/reset-password/${resetToken}`;

    await this.mailService.sendResetPasswordEmail(
      user.email,
      resetLink,
    );

    return {
      message:
        'Password reset link sent to email',
    };
  }

  async resetPassword(
    token: string,
    resetDto: ResetPasswordDto,
  ) {
    const user =
      await this.usersService.findByResetToken(
        token,
      );

    if (!user) {
      throw new BadRequestException(
        'Invalid reset token',
      );
    }

    if (
      !user.reset_token_expiry ||
      user.reset_token_expiry <
        new Date()
    ) {
      throw new BadRequestException(
        'Reset token expired',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        resetDto.newPassword,
        10,
      );

    user.password = hashedPassword;

    user.reset_token = null;

    user.reset_token_expiry = null;

    await this.usersService.save(user);

    return {
      message:
        'Password reset successfully',
    };
  }
}