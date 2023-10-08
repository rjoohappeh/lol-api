/*
  Warnings:

  - Added the required column `accountId` to the `SummonerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileIconId` to the `SummonerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revisionDate` to the `SummonerAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summonerLevel` to the `SummonerAccount` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SummonerAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountId" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" INTEGER NOT NULL,
    "summonerLevel" INTEGER NOT NULL
);
INSERT INTO "new_SummonerAccount" ("id", "name", "puuid") SELECT "id", "name", "puuid" FROM "SummonerAccount";
DROP TABLE "SummonerAccount";
ALTER TABLE "new_SummonerAccount" RENAME TO "SummonerAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
