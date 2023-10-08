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

    getAccountByName(name: string): Promise<LoLAccountDto> {
        const apiKey = this.configService.get<string>('RIOT_API_KEY');
        const baseUrl = this.configService.get<string>('LOL_NA_BASE_URL');

        const path = `/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`;
        const fullPath = baseUrl + path;

        return firstValueFrom(
            this.httpService.get<LoLAccountDto>(fullPath).pipe(
                map(response => {
                    const puuid = response.data.puuid;
                    if (!this.userAccountRepo.summonerAccountExistsByPuuid(puuid)) {
                        this.userAccountRepo.createSummonerAccount(puuid);
                    }
                    return response.data;
                }),
            )
        ).catch((err) => {
            console.log(err.response);
            if (err.response.status === 404) {
                return undefined;
            }
        });
    }

    async getRankedStatsBySummonerName(summonerName: string): Promise<RankedStatsDto[]> {
        const lolAccountDto = await this.getAccountByName(summonerName);
        if (lolAccountDto) {
            const apiKey = this.configService.get<string>('RIOT_API_KEY');
            const baseUrl = this.configService.get<string>('LOL_NA_BASE_URL');

            const path = `/lol/league/v4/entries/by-summoner/${lolAccountDto.id}?api_key=${apiKey}`;
            const fullPath = baseUrl + path;

            return firstValueFrom(
                this.httpService.get<RankedStatsDto[]>(fullPath).pipe(
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
