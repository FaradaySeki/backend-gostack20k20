import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  value: number;
  type: 'income' | 'outcome';
  title: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total)
      throw Error('Your balance is not valid for this transaction');

    const transaction = this.transactionsRepository.create({
      value,
      type,
      title,
    });
    if (!transaction) throw Error('Somethings wrong /1!');
    return transaction;
  }
}

export default CreateTransactionService;
