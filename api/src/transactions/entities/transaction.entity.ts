import { randomUUID } from 'node:crypto';
export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export type TransactionRequest = {
  amount: number;
  type: TransactionType;
};

class Transaction {
  idempotencyId: string;
  amount: number;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;

  constructor(amount: number, type: TransactionType) {
    this.idempotencyId = randomUUID();
    this.amount = amount;
    this.type = type;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default Transaction;
