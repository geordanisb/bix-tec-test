'use server'

import { prisma } from "@/lib/prisma";

export default async function getTransactionsOneYearBefore() {
    'use cache'
    const currentYear = (new Date()).getFullYear()
    const gte = (new Date(`${currentYear - 1}-01-01`)).getTime();
    const lte = (new Date(`${currentYear - 1}-12-31`)).getTime();

    const transactions = await prisma.transaction.findMany({
        where: {
            date: {
                gte,
                lte
            }
        }
    });
    console.log('getTransactionsLastYear ', transactions)
    return transactions;
}