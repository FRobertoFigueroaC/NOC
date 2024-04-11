import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


describe('file-system.datasource test', () => {

  const logPath = path.join(__dirname, '../../../logs');


  beforeEach(() => {
    fs.rmSync(logPath, {recursive: true, force: true});
  });

  test('should log files if they dont exists', () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual( [ 'logs-high.log', 'logs-low.log', 'logs-medium.log' ])
  });

  test('should save a log in all logs-low.log file', async() => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test',
      origin: 'file-system.datasource.test.ts'
    });
    const logDataSource = new FileSystemDataSource();
    await logDataSource.saveLog(log);

    const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');

    expect(lowLogs).toContain(JSON.stringify(log));
  });
  test('should save a log in all logs-medium.log file', async() => {
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test',
      origin: 'file-system.datasource.test.ts'
    });
    const logDataSource = new FileSystemDataSource();
    await logDataSource.saveLog(log);

    const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

    expect(lowLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });
  test('should save a log in all logs-high.log file', async() => {
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test',
      origin: 'file-system.datasource.test.ts'
    });
    const logDataSource = new FileSystemDataSource();
    await logDataSource.saveLog(log);

    const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

    expect(lowLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test('should get logs by security level', async() => {
    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test low',
      origin: 'file-system.datasource.test.ts'
    });
    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test medium',
      origin: 'file-system.datasource.test.ts'
    });
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'test high',
      origin: 'file-system.datasource.test.ts'
    });
    const logDataSource = new FileSystemDataSource();
    await logDataSource.saveLog(logLow);
    await logDataSource.saveLog(logMedium);
    await logDataSource.saveLog(logHigh);

    await logDataSource.getLogs(LogSeverityLevel.low);
    await logDataSource.getLogs(LogSeverityLevel.medium);
    await logDataSource.getLogs(LogSeverityLevel.high);

    
    const lowLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    
    // expect(lowLogs).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
    expect(lowLogs).toContain(JSON.stringify(logLow));
    expect(lowLogs).toContain(JSON.stringify(logMedium));
    expect(lowLogs).toContain(JSON.stringify(logHigh));
    expect(mediumLogs).toContain(JSON.stringify(logMedium));
    expect(highLogs).toContain(JSON.stringify(logHigh));

  });
});