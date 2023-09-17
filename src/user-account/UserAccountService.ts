import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserAccountService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    getAccountByName(name: string): any {
        const apiKey = this.configService.get<string>('RIOT_API_KEY');
        const baseUrl = this.configService.get<string>('LOL_NA_BASE_URL');

        const path = `/lol/summoner/v4/summoners/by-name/${name}`;
        const fullPath = baseUrl + path;

        return this.httpService.get<any>(fullPath);
    }
}