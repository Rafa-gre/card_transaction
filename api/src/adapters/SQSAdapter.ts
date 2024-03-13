import { SQS } from 'aws-sdk';
import { AwsConfigService } from '../config/awsConfig';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class SQSAdapter {
  private readonly sqs: AWS.SQS;

  constructor(
    @Inject(AwsConfigService)
    private readonly awsConfigService: AwsConfigService,
  ) {
    this.sqs = new SQS(this.awsConfigService.getAwsConfig());
  }
  async sendMessage(message: any, queueUrl: string): Promise<void> {
    const params: SQS.SendMessageRequest = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(message),
    };
    await this.sqs.sendMessage(params).promise();
  }
}

export default SQSAdapter;
