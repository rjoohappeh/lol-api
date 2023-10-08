import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserAccountRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async summonerAccountExistsByPuuid(puuid: string) {
        return await this.prismaService.summonerAccount.count({
            where: {
                puuid
            }
        }) !== 0;
    }

    async createSummonerAccount(puuid: string) {
        return this.prismaService.summonerAccount.create({
            data: {
                puuid
            }
        });
    }
}