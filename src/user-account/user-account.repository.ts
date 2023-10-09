import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LoLAccountDto } from "./user-account-types";

@Injectable()
export class UserAccountRepository {
    constructor(private prismaService: PrismaService,
        private logger: Logger) {}

    async getSummonerAccount(data: Partial<Omit<LoLAccountDto, 'id'>>) {
        return await this.prismaService.summonerAccount.findFirstOrThrow({
            where: {
                ...data,
                name: data.name.toLowerCase(),
            }
        });
    }

    async summonerAccountExists(data: Partial<Omit<LoLAccountDto, 'id'>>) {
        return await this.prismaService.summonerAccount.count({
            where: {
                ...data,
                name: data.name.toLowerCase()
            }
        }) !== 0;
    }

    async createSummonerAccount(data: LoLAccountDto) {
        const account = await this.prismaService.summonerAccount.create({
            data: {
                ...data,
                revisionDate: new Date(data.revisionDate),
                name: data.name.toLowerCase(),
            }
        }).then(() => this.logger.log(`Account information saved with name ${data.name}`));
    }
}