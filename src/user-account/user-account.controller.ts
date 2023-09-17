import { Controller, Get, Param } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { LoLAccountDto } from './user-account-types';
import { Observable } from 'rxjs';

@Controller('user-account')
export class UserAccountController {

    constructor(private readonly userAccountService: UserAccountService) {}

    @Get('/:name')
    getAccountByName(@Param('name') name: string): Observable<LoLAccountDto> {
        return this.userAccountService.getAccountByName(name);
    }
}
