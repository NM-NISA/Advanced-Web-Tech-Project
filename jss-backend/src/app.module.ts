import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}