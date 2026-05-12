import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
  ) {}

  async sendApplicationSuccessEmail(
    to: string,
    jobTitle: string,
  ) {
    await this.mailerService.sendMail({
      to,

      subject: 'Job Application Submitted',

      html: `
        <h2>Application Submitted Successfully</h2>

        <p>You applied for:</p>

        <h3>${jobTitle}</h3>

        <p>Thank you for using our Job Searching System.</p>
      `,
    });

    console.log('Email sent successfully');
  }

  async notifyEmployer(
    to: string,
    applicantName: string,
    jobTitle: string,
  ) {
    await this.mailerService.sendMail({
      to,

      subject: 'New Job Applicant',

      html: `
        <h2>New Applicant Received</h2>

        <p>${applicantName} applied for:</p>

        <h3>${jobTitle}</h3>
      `,
    });

    console.log('Email sent successfully');
  }

  async sendStatusUpdateEmail(
    to: string,
    status: string,
    jobTitle: string,
  ) {
    await this.mailerService.sendMail({
      to,

      subject: 'Application Status Updated',

      html: `
        <h2>Your Application Status Updated</h2>

        <p>Job:</p>

        <h3>${jobTitle}</h3>

        <p>Status:</p>

        <h3>${status}</h3>
      `,
    });

    console.log('Email sent successfully');
  }

  async sendResetPasswordEmail(
    to: string,
    resetLink: string,
  ) {
    await this.mailerService.sendMail({
      to,

      subject: 'Reset Your Password',

      html: `
        <h2>Password Reset Request</h2>

        <p>Click below link to reset password:</p>

        <a href="${resetLink}">
          Reset Password
        </a>

        <p>Link expires in 15 minutes.</p>
      `,
    });
  }
}