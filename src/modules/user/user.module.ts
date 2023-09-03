import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prismaClient';
import { UserRepository } from './user.repository';

import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
})
export class UserModule {}
