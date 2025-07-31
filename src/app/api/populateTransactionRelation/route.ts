
import { Transaction } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs";
import path from "path"
import { cwd } from "process"
import { promisify } from "util";

export const dynamic = 'force-static'
 
export async function GET() {
  const filepath = path.join(cwd(),'data','transactions.json');
  const readFilePromisify = promisify(readFile);
  const res = await readFilePromisify(filepath,'utf-8');
  const transactions = JSON.parse(res); 
  const promises = [];
  
  promises.push(prisma.transaction.createMany({
    data: transactions.map((t:Partial<Transaction>)=>({...t,date:t.date!}))
  }));
  
  const newtransactions = await Promise.all(promises);
  return Response.json({ transactions:newtransactions })
}