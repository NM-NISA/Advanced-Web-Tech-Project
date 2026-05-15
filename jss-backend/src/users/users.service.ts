import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async create(userData: Partial<User>) {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }

  async findById(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async save(user: User) {
    return this.userRepo.save(user);
  }

  async findByResetToken(token: string) {
    return this.userRepo.findOne({
      where: {
        reset_token: token,
      },
    });
  }
  
  async updateProfile(
    userId: number,
    updateDto: any,
  ) {

    const user =
      await this.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.full_name =
      updateDto.full_name;

    user.phone =
      updateDto.phone;

    return this.userRepo.save(user);
  }
}