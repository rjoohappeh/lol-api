/*
  Warnings:

  - Added the required column `name` to the `SummonerAccount` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SummonerAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "puuid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_SummonerAccount" ("id", "puuid") SELECT "id", "puuid" FROM "SummonerAccount";
DROP TABLE "SummonerAccount";
ALTER TABLE "new_SummonerAccount" RENAME TO "SummonerAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
