import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';
import { LoLAccountDto } from './user-account-types';

@Injectable()
export class UserAccountService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    getAccountByName(name: string): Observable<LoLAccountDto> {
        const apiKey = this.configService.get<string>('RIOT_API_KEY');
        const baseUrl = this.configService.get<string>('LOL_NA_BASE_URL');

        const path = `/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`;
        const fullPath = baseUrl + path;

        return this.httpService.get<LoLAccountDto>(fullPath).pipe(
            map(response => response.data)
        );
    }
}
