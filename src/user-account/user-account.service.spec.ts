import { HttpService } from "@nestjs/axios";
import { UserAccountService } from "./user-account.service";
import { mockDeep } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";
import { UserAccountRepository } from "./user-account.repository";
import { PrismaService } from "../prisma/prisma.service";
import { Logger } from "@nestjs/common";
import { of } from "rxjs";
import { createFakeLolAccountDto } from "../../test/test.util";

describe('user account service', () => {
    let service: UserAccountService;
    let prisma: PrismaService;
    let userAccountRepo: UserAccountRepository;
    
    const httpService = mockDeep<HttpService>();

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: HttpService,
                    useValue: httpService
                },
                ConfigService,
                UserAccountRepository,
                PrismaService,
                Logger,
                UserAccountService
            ]
        }).compile();

        service = app.get<UserAccountService>(UserAccountService);
        prisma = app.get<PrismaService>(PrismaService);
        userAccountRepo = app.get<UserAccountRepository>(UserAccountRepository);
    });

    afterEach(() => {
        prisma.summonerAccount.deleteMany();
    });

    describe('get account by name', () => {
        it('should create a new row in the table when no account exists with the given name', async () => {
            const fakeLolAccount = createFakeLolAccountDto();
            const response: AxiosResponse<unknown, any> = {
                data: fakeLolAccount,
                headers: {},
                config: {headers: undefined},
                status: 200,
                statusText: 'OK'
            };

            httpService.get.mockReturnValue(of(response));
            await service.getAccountByName('test-name');

            const userAccountExists = await userAccountRepo.summonerAccountExists({name: fakeLolAccount.name});
            expect(userAccountExists).toBe(true);
        });
    });
})