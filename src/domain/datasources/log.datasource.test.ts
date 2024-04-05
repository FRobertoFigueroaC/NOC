import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('log.datasource', () => {

  const newLog = new LogEntity({
    message: 'testing',
    origin: 'log.datasource.test.ts',
    level: LogSeverityLevel.low
  });

  class MockLogDatasource implements LogDatasource{
    async saveLog( log: LogEntity ): Promise<void> {
      return;
    }
    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
      return [newLog];
    }

  }

  test('should test the abstract class', async () => {

    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(mockLogDatasource).toHaveProperty('saveLog');
    expect(typeof mockLogDatasource.saveLog).toEqual('function');
    expect(mockLogDatasource).toHaveProperty('getLogs');
    expect(typeof mockLogDatasource.getLogs).toEqual('function');

    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs).toHaveLength(1);
    
  });

});