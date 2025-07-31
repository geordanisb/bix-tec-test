-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "state" TEXT NOT NULL
);
