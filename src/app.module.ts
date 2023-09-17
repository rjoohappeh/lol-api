import { Module } from '@nestjs/common';
import { UserAccountModule } from './user-account/user-account.module';

@Module({
  imports: [
    UserAccountModule,
  ],
})
export class AppModule {}
