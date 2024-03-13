import { Controller, Post, Get, Query, Body, Inject } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { TransactionType } from './entities/transaction.entity';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(TransactionsService)
    private readonly transactionsService: TransactionsService,
  ) {}

  @ApiOperation({ summary: 'Create a transaction' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  async createTransaction(
    @Body() transaction: CreateTransactionDto,
  ): Promise<void> {
    await this.transactionsService.createTransaction(transaction);
  }

  @ApiOperation({ summary: 'List transactions within a date range' })
  @ApiBadRequestResponse({ description: 'Invalid query parameters' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date for filtering transactions',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date for filtering transactions',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Transaction type for filtering transactions',
    enum: Object.values(TransactionType),
    enumName: 'TransactionType',
  })
  async listTransactions(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
  ): Promise<any> {
    try {
      this.listTransactions;
      return await this.transactionsService.findAll(startDate, endDate, type);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Error fetching transactions.');
    }
  }
}
