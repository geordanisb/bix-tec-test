'use server'

import { prisma } from "@/lib/prisma";

export default async function getTransactionsTwoYearsBefore() {
    'use cache'
    const currentYear = (new Date()).getFullYear();
    const gte = (new Date(`${currentYear-2}-01-01`)).getTime(); 
    const lte = (new Date(`${currentYear-2}-12-31`)).getTime(); 
    const transactions = await prisma.transaction.findMany({
        where: {
            date: {
                gte,
                lte
            }
        }
    });
    console.log('getTransactionsLastTwoYears ', transactions)
    return transactions;
}