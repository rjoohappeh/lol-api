/*
  Warnings:

  - The primary key for the `SummonerAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SummonerAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" INTEGER NOT NULL,
    "summonerLevel" INTEGER NOT NULL
);
INSERT INTO "new_SummonerAccount" ("accountId", "id", "name", "profileIconId", "puuid", "revisionDate", "summonerLevel") SELECT "accountId", "id", "name", "profileIconId", "puuid", "revisionDate", "summonerLevel" FROM "SummonerAccount";
DROP TABLE "SummonerAccount";
ALTER TABLE "new_SummonerAccount" RENAME TO "SummonerAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
