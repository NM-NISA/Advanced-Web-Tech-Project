import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule,

    MailerModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',

          auth: {
            user: configService.get<string>('MAIL_USER'),

            pass: configService.get<string>('MAIL_PASS'),
          },
        },
      }),
    }),
  ],

  providers: [MailService],

  exports: [MailService],
})
export class MailModule {}