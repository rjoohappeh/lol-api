import { LoLAccountDto, RankWithinTier, RankedStatsDto, RankedTier } from "../src/user-account/user-account-types";
import { faker } from '@faker-js/faker';

export function createFakeLolAccountDto(lolAccountDto?: Partial<LoLAccountDto>): LoLAccountDto {
    return {
        id: faker.string.uuid(),
        accountId: faker.string.uuid(),
        puuid: faker.string.uuid(),
        name: faker.person.firstName() + faker.person.lastName(),
        profileIconId: faker.number.int({min: 0, max: 5000}),
        revisionDate: faker.date.past(),
        summonerLevel: faker.number.int({min: 0, max: 5000}),
        ...lolAccountDto
    };
}

export function createFakeRankedStatsDto(rankedStatsDto?: Partial<RankedStatsDto>): RankedStatsDto {
    return {
        leagueId: faker.string.uuid(),
        queueType: faker.string.alpha(),
        tier: faker.helpers.enumValue(RankedTier),
        rank: faker.helpers.enumValue(RankWithinTier),
        summonerId: faker.string.uuid(),
        summonerName: faker.person.firstName() + faker.person.lastName(),
        leaguePoints: faker.number.int({min: 0, max: 100}),
        wins: faker.number.int(),
        losses: faker.number.int(),
        veteran: faker.datatype.boolean(),
        inactive: faker.datatype.boolean(),
        freshBlood: faker.datatype.boolean(),
        hotStreak: faker.datatype.boolean(),
        ...rankedStatsDto
    };
}