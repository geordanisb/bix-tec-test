'use server'
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
// import { prisma } from "@/lib/prisma";

export default async function getTransactionsByYear(year:number) {
    const fr = await fetch(`${NEXTAUTH_URL}/api/transactions/${year}`, { cache: 'force-cache' });
    
    if(fr.ok){
        const {transactions} = await fr.json();
        return transactions;
    }
    // 'use cache'
    // const gte = (new Date(`${year}-01-01`)).getTime(); 
    // const lte = (new Date(`${year}-12-31`)).getTime(); 
    // const transactions = await prisma.transaction.findMany({
    //     where: {
    //         date: {
    //             gte,
    //             lte
    //         }
    //     }
    // });
    // return transactions;
}