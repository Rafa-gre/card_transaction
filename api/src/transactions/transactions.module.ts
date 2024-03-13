import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import SQSAdapter from '../adapters/SQSAdapter';
import { DynamoDbAdapter } from '../adapters/DynamoDbAdapter';
import { AwsConfigService } from '../config/awsConfig';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    SQSAdapter,
    DynamoDbAdapter,
    AwsConfigService,
  ],
})
export class TransactionsModule {}
