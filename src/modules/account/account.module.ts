import { Global, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { PrismaService } from 'src/database/prismaClient';
import { AccountRepository } from './account.repository';
@Global()
@Module({
  providers: [AccountService, PrismaService, AccountRepository],
  exports: [AccountService],
})
export class AccountModule {}
