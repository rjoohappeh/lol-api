import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LoLAccountDto } from "./user-account-types";

@Injectable()
export class UserAccountRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async getSummonerAccount(data: Partial<Omit<LoLAccountDto, 'id'>>) {
        return await this.prismaService.summonerAccount.findFirstOrThrow({
            where: {
                ...data
            }
        });
    }

    async summonerAccountExists(data: Partial<Omit<LoLAccountDto, 'id'>>) {
        return await this.prismaService.summonerAccount.count({
            where: {
                ...data
            }
        }) !== 0;
    }

    async createSummonerAccount(data: LoLAccountDto) {
        return this.prismaService.summonerAccount.create({
            data: {
                ...data,
                revisionDate: new Date(data.revisionDate)
            }
        });
    }
}