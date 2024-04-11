import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
  to:string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

export interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });


  async sendEmail(options: SendMailOptions):Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,subject, 
        html:htmlBody,
        attachments: attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs (to: string | string[]){
    const subject = 'Logs server';
    const htmlBody = `
      <h3>Logs de sistema - NOC</h3>
      <p>Aute magna nostrud tempor tempor mollit quis do ipsum minim deserunt reprehenderit ea. In excepteur elit eu ut do dolor enim nostrud pariatur cillum consectetur elit cillum nulla. Occaecat est ea et cillum mollit laborum occaecat ipsum mollit quis.</p>
      <button>
        Check Logs
      </button>
    `;
    const attachments: Attachments[] = [
      {filename: 'logs-high.log', path: './logs/logs-high.log'},
      {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
      {filename: 'logs-low.log', path: './logs/logs-low.log'}
    ];
    return this.sendEmail({to, subject, attachments, htmlBody});
  }




}