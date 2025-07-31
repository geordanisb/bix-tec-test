'use server'

import { prisma } from "@/lib/prisma";

export default async function getTransactionsByYear(year:number) {
    // 'use cache'
    const gte = (new Date(`${year}-01-01`)).getTime(); 
    const lte = (new Date(`${year}-12-31`)).getTime(); 
    const transactions = await prisma.transaction.findMany({
        where: {
            date: {
                gte,
                lte
            }
        }
    });
    return transactions;
}