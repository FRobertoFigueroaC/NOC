
interface CheckServiceUseCase {
  execute(ur:string):Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error:string)=> void;

export class CheckService implements CheckServiceUseCase {

  constructor(
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
      this.successCallback();
      return true;
    } catch (error) {
      this.errorCallback(`${error}`)
      return false
    }
  }

}