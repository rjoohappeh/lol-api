import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { LoLAccountDto, RankedStatsDto } from './user-account-types';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';

@Controller('user-account')
export class UserAccountController {

    constructor(private readonly userAccountService: UserAccountService) {}

    @Get('/:name')
    @UseInterceptors(new NotFoundInterceptor("No account found with that summoner name"))
    getAccountByName(@Param('name') name: string): Promise<LoLAccountDto> {
        return this.userAccountService.getAccountByName(name);
    }

    @Get('/ranked/stats/:summonerName')
    @UseInterceptors(new NotFoundInterceptor("No ranked stats found with that summoner name"))
    getRankedStatsBySummonerName(@Param('summonerName') summonerName: string): Promise<RankedStatsDto[]> {
        return this.userAccountService.getRankedStatsBySummonerName(summonerName);
    }
}
