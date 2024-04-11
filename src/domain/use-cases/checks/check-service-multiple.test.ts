import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';


describe('check-service-multiple tests', () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  beforeEach(() => {
   jest.clearAllMocks();
  })


  test('should call successCallback when fetch returns true', async() => {
    const checkService = new CheckServiceMultiple([mockRepository1, mockRepository2],successCallback,errorCallback);

    const wasOk = await checkService.execute('https://google.com');

    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(wasOk).toBeTruthy();
  });

  test('should call errorCallback when fetch fails', async() => {
    const checkService = new CheckServiceMultiple([mockRepository1, mockRepository2],successCallback,errorCallback);

    const wasOk = await checkService.execute('testingUrl');

    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(wasOk).toBeFalsy();
  });
});