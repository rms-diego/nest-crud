import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../database/prismaClient';
import { UserRepository } from './user.repository';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
})
export class UserModule {}
