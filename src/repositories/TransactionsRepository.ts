/* eslint-disable @typescript-eslint/class-name-casing */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransaction {
  value: number;
  type: 'income' | 'outcome';
  title: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (w: number, t: Transaction) => (t.type === 'income' ? w + t.value : w),
      0,
    );

    const outcome = this.transactions.reduce(
      (w: number, t: Transaction) => (t.type === 'outcome' ? w + t.value : w),
      0,
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ value, title, type }: createTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
