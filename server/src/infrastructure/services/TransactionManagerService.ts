import { type Transaction, db } from 'infrastructure/database/connection'
import { ITransactionManagerService } from 'application/interfaces/ITransactionManagerService'

export class TransactionManagerService implements ITransactionManagerService {
  public async startTransaction<T>(
    callback: (tx: Transaction) => Promise<T>,
    parent?: Transaction,
  ): Promise<T> {
    const invoker = parent ?? db
    return invoker.transaction(callback as any)
  }
}

export interface ITransaction {
  rollback(): Promise<void>
}
