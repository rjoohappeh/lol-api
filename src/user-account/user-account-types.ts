export type LoLAccountDto = {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

export type RankedStatsDto = {
    leagueId: string;
    queueType: string;
    tier: RankedTier;
    rank: RankWithinTier;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}

export enum RankedTier {
    IRON = "IRON",
    BRONZE = "BRONZE",
    SILVER = "SILVER",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM",
    EMERALD = "EMERALD",
    DIAMOND = "DIAMOND",
    MASTER = "MASTER",
    GRANDMASTER = "GRANDMASTER",
    CHALLENGER = "CHALLENGER"
}

export enum RankWithinTier {
    ONE = "I",
    TWO = "II",
    THREE = "III",
    FOUR = "IV"
}