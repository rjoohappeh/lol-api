import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import { LoLAccountDto } from './user-account-types';

@Injectable()
export class UserAccountService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    getAccountByName(name: string): Promise<LoLAccountDto> {
        const apiKey = this.configService.get<string>('RIOT_API_KEY');
        const baseUrl = this.configService.get<string>('LOL_NA_BASE_URL');

        const path = `/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`;
        const fullPath = baseUrl + path;

        return firstValueFrom(
                this.httpService.get<LoLAccountDto>(fullPath).pipe(
                    map(response => response.data),
                )
            ).catch((err) => {
                if (err.response.status === 404) {
                    return undefined;
                }
            });
    }
}
