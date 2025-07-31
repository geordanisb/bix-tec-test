'use server'

import { prisma } from "@/lib/prisma";

export  default async function getTransactionsThisYear() {

    const currentYear = (new Date()).getFullYear();
    const gte = (new Date(`${currentYear}-01-01`)).getTime(); 
    const lte = (new Date(`${currentYear}-12-31`)).getTime(); 

    const transactions = await prisma.transaction.findMany({
        where: {
            date: {
                gte,
                lte
            }
        }
    });
    console.log('getTransactionsThisYear ', transactions)
    return transactions;
}

