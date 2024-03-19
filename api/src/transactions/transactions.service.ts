import { Injectable, Inject } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { isValid, parseISO } from 'date-fns';
import Transaction from './entities/transaction.entity';
import SQSAdapter from '../adapters/SQSAdapter';
import { DynamoDB } from 'aws-sdk';
import { DynamoDbAdapter } from '../adapters/DynamoDbAdapter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(SQSAdapter)
    private readonly sqsAdapter: SQSAdapter,

    @Inject(DynamoDbAdapter)
    private readonly dynamoDB: DynamoDbAdapter,

    private readonly configService: ConfigService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { amount, type } = createTransactionDto;
    const message = new Transaction(amount, type);
    const queueUrl = this.configService.get(
      'CREATE_CARD_TRANSACTION_QUEUE_URL',
    );
    return await this.sqsAdapter.sendMessage(message, queueUrl);
  }

  async findAll(startDateStr?: string, endDateStr?: string, type?: string) {
    try {
      // Verificar se as datas são válidas e convertê-las para o formato ISO 8601
      const startDateISO =
        startDateStr && this.isValidISODate(startDateStr)
          ? startDateStr
          : undefined;
      const endDateISO =
        endDateStr && this.isValidISODate(endDateStr) ? endDateStr : undefined;

      const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: 'card_transactions',
      };

      // Se startDate e endDate foram fornecidos, adicionamos filtros de data à consulta
      if (startDateISO && endDateISO) {
        params.FilterExpression = '#createdAt between :startDate and :endDate';
        params.ExpressionAttributeNames = { '#createdAt': 'createdAt' };
        params.ExpressionAttributeValues = {
          ':startDate': startDateISO,
          ':endDate': endDateISO,
        };
      }
      if (type) {
        const typeFilter = '#type = :type';
        params.FilterExpression = params.FilterExpression
          ? `${params.FilterExpression} AND ${typeFilter}`
          : typeFilter;
        params.ExpressionAttributeNames = {
          ...(params.ExpressionAttributeNames || {}),
          '#type': 'type',
        };
        params.ExpressionAttributeValues = {
          ...(params.ExpressionAttributeValues || {}),
          ':type': type,
        };
      }

      const result = await this.dynamoDB.scan(params);

      // Mapear os resultados da consulta para objetos Transaction
      const cardTransactions: Transaction[] =
        result.Items?.map((item) => ({
          idempotencyId: item.idempotencyId,
          amount: item.amount,
          type: item.type,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })) || [];

      return cardTransactions;
    } catch (error) {
      // Tratar erros, se necessário
      throw new Error(`Erro ao buscar transações: ${error}`);
    }
  }

  private isValidISODate(dateStr: string): boolean {
    const parsedDate = parseISO(dateStr);
    return isValid(parsedDate);
  }
}
