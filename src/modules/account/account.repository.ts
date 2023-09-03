import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaClient';

@Injectable()
export class AccountRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(userId: string) {
    const accountCreated = await this.prismaClient.wallet.create({
      data: {
        userId,
      },
    });

    return accountCreated;
  }
}
