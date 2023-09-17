import { LoLAccountDto } from "src/user-account/user-account-types";
import { faker } from '@faker-js/faker';

export function createFakeLolAccountDto(): LoLAccountDto {
    return {
        id: faker.string.uuid(),
        accountId: faker.string.uuid(),
        puuid: faker.string.uuid(),
        name: faker.person.firstName() + faker.person.lastName(),
        profileIconId: faker.number.int(),
        revisionDate: faker.date.past().getTime(),
        summonerLevel: faker.number.int()
    };
}