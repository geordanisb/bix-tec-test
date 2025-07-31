-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" BIGINT NOT NULL,
    "amount" TEXT NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pending" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Transaction" ("account", "amount", "currency", "date", "id", "industry", "state", "transaction_type") SELECT "account", "amount", "currency", "date", "id", "industry", "state", "transaction_type" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
