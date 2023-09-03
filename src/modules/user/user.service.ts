import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO, LoginUserDTO } from './userTypes';
import { UserRepository } from './user.repository';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly accountService: AccountService,
  ) {}

  async createUser({ email, name, password }: CreateUserDTO) {
    const userFound = await this.findByEmail(email);

    if (userFound) throw new HttpException('user already exists', 400);

    const hashPassword = await bcrypt.hash(password, 10);

    const userPayload = {
      email,
      name,
      password: hashPassword,
    };

    const userCreated = await this.userRepository.createUser(userPayload);

    await this.accountService.createAccount(userCreated.id);

    return userCreated;
  }

  async findByEmail(email: string) {
    const userFound = await this.userRepository.findByEmail(email);

    return userFound;
  }

  async login({ email, password }: LoginUserDTO) {
    const userFound = await this.findByEmail(email);

    if (!userFound) {
      throw new HttpException('user does not exists', 400);
    }

    const isValidPassword = await bcrypt.compare(password, userFound.password);

    if (!isValidPassword) {
      throw new HttpException('wrong password', 400);
    }

    const token = await this.jwtService.signAsync(userFound);

    return token;
  }
}
