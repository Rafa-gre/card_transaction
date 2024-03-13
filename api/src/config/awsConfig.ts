import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsConfigService {
  private readonly awsConfig: AWS.Config;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.awsConfig = new AWS.Config({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      region: this.configService.get('AWS_REGION'),
    });
  }

  getAwsConfig(): AWS.Config {
    return this.awsConfig;
  }
}
