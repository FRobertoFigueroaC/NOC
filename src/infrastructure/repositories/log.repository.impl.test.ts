import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl';


describe('log.repository.impl tests ', () => {

  const mockDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks();
   })


  test('should call saveLog function with arguments', async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test',
      origin: 'log.repository.impl.test.ts'
    });
    const repository = new LogRepositoryImpl(mockDataSource);
    await repository.saveLog(log);

    const mockDataSourceSpy = jest.spyOn(mockDataSource, 'saveLog');

    expect(mockDataSourceSpy).toHaveBeenCalled();
    expect(mockDataSourceSpy).toHaveBeenCalledWith(log);
  });

  test('should call getLogs function with arguments', async() => {
    const repository = new LogRepositoryImpl(mockDataSource);
    await repository.getLogs(LogSeverityLevel.low);
    const mockDataSourceSpy = jest.spyOn(mockDataSource, 'getLogs');
    expect(mockDataSourceSpy).toHaveBeenCalled();
    expect(mockDataSourceSpy).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
});