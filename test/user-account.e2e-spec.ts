import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { UserAccountModule } from "../src/user-account/user-account.module";
import { UserAccountService } from "../src/user-account/user-account.service";
import { createFakeLolAccountDto, createFakeRankedStatsDto } from "./test.util";

describe('User Account', () => {
    let app: INestApplication;
    let userAccountService = { getAccountByName: () => {} }

    beforeAll(async() => {
        const moduleRef = Test.createTestingModule({
            imports: [UserAccountModule],
        })
        .overrideProvider(UserAccountService)
        .useValue(userAccountService)
        .compile();

        app = (await moduleRef).createNestApplication();        
        await app.init();
    });

    describe('get account by name', () => {
        it('should return a 404 if no account exists with the given summoner name', () => {
            const expectedResponse = {
                message: "No account found with that summoner name",
                error: "Not Found", 
                statusCode: 404
            }
            return request(app.getHttpServer())
                .get('/user-account/test')
                .expect(404)
                .expect(expectedResponse);
        });

        it('should return a 200 with an LolAccountDto in the response when the summoner name exists', async () => {
            const userAccountService = await app.resolve(UserAccountService);
            const fakeLolAccount = createFakeLolAccountDto();
            userAccountService.getAccountByName = jest.fn(() =>Promise.resolve(fakeLolAccount));

            return request(app.getHttpServer())
                .get('/user-account/test')
                .expect(200)
                .expect(fakeLolAccount);    
        });
    });

    describe('get ranked information by summoner id', () => {
        it('should return a 200 with a RankedStatsDto when a response is given by the api', async () => {
            const userAccountService = await app.resolve(UserAccountService);
            const fakeRankedStatsDto = createFakeRankedStatsDto();
            userAccountService.getRankedStatsBySummonerId = jest.fn(() => Promise.resolve([fakeRankedStatsDto]));
            
            return request(app.getHttpServer())
                .get('/user-account/ranked/stats/test')
                .expect(200)
                .expect(fakeRankedStatsDto);
        });
    })
});