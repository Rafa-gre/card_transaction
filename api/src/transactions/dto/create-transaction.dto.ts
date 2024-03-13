import { IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Transaction amount' })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @ApiProperty({ description: 'Transaction type', enum: TransactionType })
  @IsNotEmpty({ message: 'Transaction type is required' })
  @IsEnum(TransactionType, { message: 'Invalid transaction type' })
  type: TransactionType;
}
