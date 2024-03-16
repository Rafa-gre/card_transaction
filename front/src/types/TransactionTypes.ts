

export interface Transaction  {
  idempotencyId: string
  amount: number
  type: TransactionType
  createdAt: string
  updatedAt: string
}

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}

export interface TransactionFilter {
  type?: TransactionType
  startDate?: string
  endDate?: string
}