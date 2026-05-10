import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '191035',
      database: 'job_searching_system',
      autoLoadEntities: true,
      synchronize: false,
    }),

    AuthModule,
    UsersModule,
    JobsModule,
    ApplicationsModule,
  ],
})
export class AppModule {}