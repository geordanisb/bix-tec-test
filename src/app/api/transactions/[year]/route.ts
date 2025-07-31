
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-static';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: number }> }
) {
  console.log('push from api, not cached!')
  const { year } = await params;
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
  const str = JSON.stringify(transactions, (key, value) =>
    typeof value === "bigint" ? Number(value) : value,
  );

  return Response.json({ transactions:JSON.parse(str) })
}


