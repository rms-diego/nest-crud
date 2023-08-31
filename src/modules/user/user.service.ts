import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './userTypes';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

    return userCreated;
  }

  async findByEmail(email: string) {
    const userFound = await this.userRepository.findByEmail(email);

    return userFound;
  }
}
