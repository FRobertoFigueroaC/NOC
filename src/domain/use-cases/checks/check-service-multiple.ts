import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
  execute(ur:string):Promise<boolean>;
}

type SuccessCallback = (() => void )| undefined;
type ErrorCallback = ((error:string)=> void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  private readonly selfOrigin = 'check-service.ts';

  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ){

  }

  private callLogs(log:LogEntity){
    this.logRepositories.forEach(logRepository => {
      logRepository.saveLog(log);
    })
  }

  public async execute (url: string): Promise<boolean>{

    try {
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error(`Error on CheckService ${url}`);
      }
      const log = new LogEntity({
        message: `Service with ${url} working`,
        level: LogSeverityLevel.low,
        origin: this.selfOrigin
      });
      this.callLogs(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMsg = `${url} is not ok`
      const log = new LogEntity({
        message: errorMsg,
        level: LogSeverityLevel.high,
        origin: this.selfOrigin
      });
      this.callLogs(log);

      this.errorCallback && this.errorCallback(errorMsg);
      return false
    }
  }

}