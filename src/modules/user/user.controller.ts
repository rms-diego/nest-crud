import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/shared/PipeValidation';

import {
  CreateUserDTO,
  LoginUserDTO,
  createUserSchema,
  loginUserSchema,
} from './userTypes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserPayload: CreateUserDTO): Promise<void> {
    const { email, name, password } = createUserPayload;

    await this.userService.createUser({ email, name, password });

    return;
  }

  @Post('/login')
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async login(
    @Body() loginUserPayload: LoginUserDTO,
    @Res() response: FastifyReply,
  ) {
    const { email, password } = loginUserPayload;

    const token = await this.userService.login({ email, password });

    return response.status(200).send({ token });
  }
}
