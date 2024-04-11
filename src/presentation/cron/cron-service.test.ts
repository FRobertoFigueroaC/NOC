import { CronService } from './cron-service';


describe('cron-service tests', () => {
  const mockTick = jest.fn();

  test('should createa job', (done) => {
    const job = CronService.createJob('* * * * * *', mockTick);
    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });
});