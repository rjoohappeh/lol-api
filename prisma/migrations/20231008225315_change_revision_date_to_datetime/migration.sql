/*
  Warnings:

  - You are about to alter the column `revisionDate` on the `SummonerAccount` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SummonerAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" DATETIME NOT NULL,
    "summonerLevel" INTEGER NOT NULL
);
INSERT INTO "new_SummonerAccount" ("accountId", "id", "name", "profileIconId", "puuid", "revisionDate", "summonerLevel") SELECT "accountId", "id", "name", "profileIconId", "puuid", "revisionDate", "summonerLevel" FROM "SummonerAccount";
DROP TABLE "SummonerAccount";
ALTER TABLE "new_SummonerAccount" RENAME TO "SummonerAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
