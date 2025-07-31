/*
  Warnings:

  - You are about to alter the column `date` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "state" TEXT NOT NULL
);
INSERT INTO "new_Transaction" ("account", "amount", "currency", "date", "id", "industry", "state", "transaction_type") SELECT "account", "amount", "currency", "date", "id", "industry", "state", "transaction_type" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
