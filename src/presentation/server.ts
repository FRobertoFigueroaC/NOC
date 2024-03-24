import { envs } from '../config/plugins/envs.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSourcetemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email-service';

const logRepository = new LogRepositoryImpl(
  new FileSystemDataSourcetemDataSource()
  // new MongoLogDatasource()
);

const emailService = new EmailService();

// const urlToVerify = 'http://localhost:3000/posts';
const urlToVerify = 'https://www.google.com/';
export class Server {

  public static async start(){
    console.log('Server started');

    // Send email
    // new SendEmailLogs(emailService,fileSystemLogRepository).execute([envs.MAILER_EMAIL])

    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log(logs)

    

    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     logRepository,
    //     // undefined, undefined
    //     () => console.log('success'),
    //     (error) => console.log(error)
    //   ).execute(urlToVerify)
    // });
    
  }

}