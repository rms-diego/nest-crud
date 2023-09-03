import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
