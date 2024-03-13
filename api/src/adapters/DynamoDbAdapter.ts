import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsConfigService } from '../config/awsConfig';

@Injectable()
export class DynamoDbAdapter {
  private readonly dynamoDb: AWS.DynamoDB.DocumentClient;

  constructor(
    @Inject(AwsConfigService)
    private readonly awsConfigService: AwsConfigService,
  ) {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient(
      this.awsConfigService.getAwsConfig(),
    );
  }

  async scan(params: AWS.DynamoDB.DocumentClient.ScanInput) {
    return await this.dynamoDb.scan(params).promise();
  }

  async query(params: AWS.DynamoDB.DocumentClient.QueryInput) {
    return await this.dynamoDb.query(params).promise();
  }

  async put(params: AWS.DynamoDB.DocumentClient.PutItemInput) {
    return await this.dynamoDb.put(params).promise();
  }
}
