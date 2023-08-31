import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, createUserSchema } from './userTypes';
import { ZodValidationPipe } from 'src/utils/PipeValidation';

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
}
