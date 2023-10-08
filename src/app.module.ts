import { Module } from '@nestjs/common';
import { UserAccountModule } from './user-account/user-account.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserAccountModule,
    PrismaModule
  ],
})
export class AppModule {}
