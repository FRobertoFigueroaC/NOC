import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';


describe('check-service.ts tests', () => {


  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  beforeEach(() => {
   jest.clearAllMocks();
  })


  test('should call successCallback when fetch returns true', async() => {
    const checkService = new CheckService(mockRepository,successCallback,errorCallback);

    const wasOk = await checkService.execute('https://google.com');

    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(wasOk).toBeTruthy();
  });
  test('should call errorCallback when fetch fails', async() => {
    const checkService = new CheckService(mockRepository,successCallback,errorCallback);

    const wasOk = await checkService.execute('testingUrl');

    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(wasOk).toBeFalsy();
  });
});