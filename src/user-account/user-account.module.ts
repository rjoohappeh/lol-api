import { Module } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UserAccountController } from './user-account.controller';

@Module({
  imports: [
    HttpModule, 
    ConfigModule.forRoot({
      envFilePath: '.env.development'
    }),
  ],
  providers: [UserAccountService],
  controllers: [UserAccountController]
})
export class UserAccountModule {}
