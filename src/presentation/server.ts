import { envs } from '../config/plugins/envs.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSourcetemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email-service';


// Single
// const logRepository = new LogRepositoryImpl(
//   // new FileSystemDataSourcetemDataSource()
//   // new MongoLogDatasource()
//   new PostgresLogDatasource()
// );

// Multiple
const fsRepository = new LogRepositoryImpl(new FileSystemDataSourcetemDataSource() );
const mongoRepository = new LogRepositoryImpl(new MongoLogDatasource() );
const postgresRepository = new LogRepositoryImpl(new PostgresLogDatasource() );

// Send email
// const emailService = new EmailService();
const urlToVerify = 'http://localhost:3000/posts';
// const urlToVerify = 'https://www.google.com/';
export class Server {

  public static async start(){
    console.log('Server started');
    // Send email
    // new SendEmailLogs(emailService,fileSystemLogRepository).execute([envs.MAILER_EMAIL])
    
    // Single
    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     logRepository,
    //     // undefined, undefined
    //     () => console.log('success'),
    //     (error) => console.log(error)
    //   ).execute(urlToVerify)
    // });
    
    // Multiple
    CronService.createJob('*/5 * * * * *', () => {
        new CheckServiceMultiple(
          [fsRepository, mongoRepository, postgresRepository],
          undefined, undefined
        ).execute(urlToVerify)
      });
    
  }

}