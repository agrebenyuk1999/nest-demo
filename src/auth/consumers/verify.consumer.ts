import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from '../../mail/mail.service';

@Processor('verify')
export class VerifyConsumer {
  constructor(private readonly mailService: MailService) {}
  @Process('verify-job')
  async testVerify(job: Job) {
    await this.mailService.sendUserConfirmation(job.data.email, job.data.code);
  }
}
