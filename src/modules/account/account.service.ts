import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  async createAccount(userId: string) {
    const accountCreated = await this.accountRepository.create(userId);

    return accountCreated;
  }
}
