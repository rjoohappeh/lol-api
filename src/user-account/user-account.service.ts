import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { LoLAccountDto, RankedStatsDto } from './user-account-types';
import { UserAccountRepository } from './user-account.repository';

@Injectable()
export class UserAccountService {
    constructor(private readonly httpService: HttpService, 
        private readonly configService: ConfigService,
        private readonly userAccountRepo: UserAccountRepository) {}

    getRequestPath(apiRoute: string) {
        const apiKey = this.configService.get<string>('RIOT_API_KEY');
        const baseUrl = this.configService.get<string>('LOL_NA_BASE_URL');

        const fullPath = baseUrl + apiRoute + `?api_key=${apiKey}`;
        return fullPath;
    }
    
    async getAccountByName(name: string): Promise<LoLAccountDto> {
        try {
            return await this.userAccountRepo.getSummonerAccount({name});
        } catch (err) {
            console.log('No account exists with the given name. Will attempt to retrieve and save one.');
        }
        const path = this.getRequestPath(`/lol/summoner/v4/summoners/by-name/${name}`);

        return firstValueFrom(
            this.httpService.get<LoLAccountDto>(path).pipe(
                map(response => {
                    const lolAccountData = response.data;
                    this.userAccountRepo.createSummonerAccount(lolAccountData);
                    return lolAccountData;
                }),
            )
        ).catch((err) => {
            if (err.response.status === 404) {
                return undefined;
            }
        });
    }

    async getRankedStatsBySummonerName(summonerName: string): Promise<RankedStatsDto[]> {
        const lolAccountDto = await this.getAccountByName(summonerName);
        if (lolAccountDto) {
            const path = this.getRequestPath(`/lol/league/v4/entries/by-summoner/${lolAccountDto.id}`);

            return firstValueFrom(
                this.httpService.get<RankedStatsDto[]>(path).pipe(
                    map(response => response.data),
                )
            ).catch((err) => {
                if (err.response.status === 404) {
                    return undefined;
                }
            });
        }
        return undefined;
    }
}
