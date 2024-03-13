import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsConfigService } from './config/awsConfig';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TransactionsModule,
  ],
  providers: [AwsConfigService],
  exports: [AwsConfigService],
})
export class AppModule {}
