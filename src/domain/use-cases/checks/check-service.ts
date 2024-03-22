import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(ur:string):Promise<boolean>;
}

type SuccessCallback = (() => void )| undefined;
type ErrorCallback = ((error:string)=> void) | undefined;

export class CheckService implements CheckServiceUseCase {

  private readonly selfOrigin = 'check-service.ts';

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ){

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
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMsg = `${url} is not ok`
      const log = new LogEntity({
        message: errorMsg,
        level: LogSeverityLevel.high,
        origin: this.selfOrigin
      });
      this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(errorMsg);
      return false
    }
  }

}