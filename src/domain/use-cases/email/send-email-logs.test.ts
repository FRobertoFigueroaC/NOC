import { EmailService } from '../../../presentation/email/email-service';
import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

describe('send-email-logs', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
  }

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const sendEmailLogs = new SendEmailLogs(
      mockEmailService as any,
      mockLogRepository
  );

  beforeEach(() => {
     jest.clearAllMocks();
  });

  test('should call sendEmail and saveLog', async() => {

      const result = await sendEmailLogs.execute('robertofc.code@gmail.com');

      expect(result).toBeTruthy();
      expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
      expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);
      expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
      expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
           "createdAt": expect.any(Date),
           "level": "low",
           "message": "Log email sent",
           "origin": "send-email-logs.ts",
         })
  });

  test('should failed in error case', async() => {

    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

      const result = await sendEmailLogs.execute('robertofc.code@gmail.com');

      expect(result).toBeFalsy();
      expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
      expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);
      expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
      expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
           "createdAt": expect.any(Date),
           "level": "high",
           "message": "Error: Email log was not sent",
           "origin": "send-email-logs.ts",
         })
  });

});