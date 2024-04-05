import { LogEntity, LogSeverityLevel } from './log.entity';

const data = {
  message: 'test',
  origin: 'log.entity.test.ts',
  level: LogSeverityLevel.low
}

describe('log.entity', () => {

  test('should create a LogEntity instance', () => {

    const log = new LogEntity(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.origin).toBe(data.origin);
    expect(log.level).toBe(data.level);
    expect(log.createdAt).toBeInstanceOf(Date);

  });

  test('should create a LogEntity instance fromJson', () => {
    const json = `{"message":"${data.message}","level":"${data.level}","createdAt":"2024-03-22T02:38:05.053Z","origin":"${data.origin}"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.origin).toBe(data.origin);
    expect(log.level).toBe(data.level);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instance fromObject', () => {
    const log = LogEntity.fromObject(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.origin).toBe(data.origin);
    expect(log.level).toBe(data.level);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

});