import type { Transaction } from '@/infrastructure/database/connection'

export interface ITransactionManagerService {
  startTransaction<T>(
    callback: (tx: Transaction) => Promise<T>,
    parent?: Transaction,
  ): Promise<T>
}
