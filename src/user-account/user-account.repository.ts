import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SummonerAccount } from "@prisma/client";

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

    async createSummonerAccount(data: Omit<SummonerAccount, 'id'>) {
        const { puuid, name } = data;
        return this.prismaService.summonerAccount.create({
            data: {
                puuid,
                name
            }
        });
    }
}