import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions, Attachments } from './email-service';

describe('email-service tests', () => {
  const mockSendMail = jest.fn();

  // Mock createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });

  
  
  const emailService = new EmailService();
  const email = 'robertofc.code@gmail.com';
  test('should send email', async() => {
    const options: SendMailOptions = {
      to: 'robertofc.code@gmail.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    }

    const emailSent = await emailService.sendEmail(options);

    expect(emailSent).toBeTruthy();
    expect(mockSendMail).toHaveBeenCalledWith({
        attachments: undefined,
        html: "<h1>Test</h1>",
        subject: "Test",
        to: email
      });
  });

  test('should email with attachments', async() => {
    await emailService.sendEmailWithFileSystemLogs(email)
    expect(mockSendMail).toHaveBeenCalledWith({
      to: email, 
      subject : 'Logs server',
      html: expect.any(String),
      attachments: [
        {filename: 'logs-high.log', path: './logs/logs-high.log'},
        {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        {filename: 'logs-low.log', path: './logs/logs-low.log'}
      ]
    });
  });


});