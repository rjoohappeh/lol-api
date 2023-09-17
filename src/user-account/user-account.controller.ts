import { Controller, Get, Param } from '@nestjs/common';
import { UserAccountService } from './user-account.service';

@Controller('user-account')
export class UserAccountController {

    constructor(private readonly userAccountService: UserAccountService) {}

    @Get('/:name')
    getAccountByName(@Param('name') name: string) {
        return this.userAccountService.getAccountByName(name);
    }
}
