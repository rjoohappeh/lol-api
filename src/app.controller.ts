import { Controller, Get } from '@nestjs/common';
import { UserAccountService } from './user-account/user-account.service';

@Controller()
export class AppController {
  constructor(private userAccountService: UserAccountService) {}

  @Get()
  getHello() {
    return this.userAccountService.getAccountByName('rjoohappeh1');
  }
}
