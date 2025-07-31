'use server'
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
// import { prisma } from "@/lib/prisma";

export default async function getTransactionsByYear(year:number,{account,state}:{account:string,state:string}) {
    
    let queryString = account||state ? '?' : '';
    if(queryString){
        const params = new URLSearchParams();
        if(account)params.append('account',account);
        if(state)params.append('state',state);
        queryString+=params.toString();
    }
    const fr = await fetch(`${NEXTAUTH_URL}/api/transactions/${year}/sumary${queryString}`, { cache: 'force-cache' });
    if(fr.ok){
        const {sumary} = await fr.json();
        return sumary;
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