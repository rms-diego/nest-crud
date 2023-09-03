import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/shared/PipeValidation';
import {
  CreateTransactionDTO,
  createTransactionSchema,
} from './transactionsType';

@Controller('transactions')
export class TransactionsController {
  @Post('/create')
  @UsePipes(new ZodValidationPipe(createTransactionSchema))
  async transactionCreate(
    @Body() { title, description, amount, walletId }: CreateTransactionDTO,
  ) {
    return { title, description, amount, walletId };
  }
}
