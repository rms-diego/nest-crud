import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaClient';
import { CreateUserDTO } from './userTypes';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async findByEmail(email: string) {
    const userFound = await this.prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return userFound;
  }

  async createUser({ name, email, password }: CreateUserDTO) {
    const userCreate = await this.prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return userCreate;
  }
}
