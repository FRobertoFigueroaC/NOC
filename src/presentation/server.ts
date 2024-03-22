import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSourcetemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email-service';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSourcetemDataSource());

const emailService = new EmailService();
export class Server {

  public static start(){
    console.log('Server started');

    // Send email
    // new SendEmailLogs(emailService,fileSystemLogRepository).execute([envs.MAILER_EMAIL])

    

    CronService.createJob('*/5 * * * * *', () => {
      new CheckService(
        fileSystemLogRepository,
        // undefined, undefined
        () => console.log('success'),
        (error) => console.log(error)
      ).execute('http://localhost:3000/posts')
    });
    
  }

}