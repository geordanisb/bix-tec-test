
import { EXPENSES_VALUE, REVENUES_VALUE } from "@/constants";
import { prisma } from "@/lib/prisma";
import { amountFromString } from "@/utils";
import { NextRequest } from "next/server";
import { Sumary } from "../../../../../../types/model";

// export const dynamic = 'force-static';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: number }> }
) {
  console.log('push from api, not cached!');

  const { year } = await params;

  let { account, state } = { account: '', state: '' };
  state = request.nextUrl.searchParams.get("state")!;
  account = request.nextUrl.searchParams.get("account")!;

  const gte = (new Date(`${year}-01-01`)).getTime();
  const lte = (new Date(`${year}-12-31`)).getTime();
  const transactions = await prisma.transaction.findMany({
    select:{
      state:true,
      account:true,
      amount:true,
      date:true,
      pending:true,
      transaction_type:true,
      currency:true
    },
    where: {
      date: {
        gte,
        lte,
      },
      ...state && { state },
      ...account && { account }
    }
  });
  let sumary = {
    totalGrowth: {
      months: [...Array(12)].map((_, idx) => ({
        revenues: 0,
        expenses: 0,
      })),
      total: 0
    },
    revenues: {
      amount: 0,
      qty: 0,
      pending: 0
    },
    expenses: {
      amount: 0,
      qty: 0,
      pending: 0
    },
    companies: {},
    pendingTransactions: [...Array(12)].map((_, idx) => ({
        revenues: 0,
        expenses: 0,
      })),
    states: {}
  } as Sumary;

  transactions.forEach(t => {
    let month = (new Date(Number(t.date))).getMonth();
    let amount = amountFromString(t.amount);
    const newCompanyOrCurrency = !(t.account in sumary.companies) || !(t.currency in sumary.companies[t.account].info);
    const newStateOrCurrency = !(t.state in sumary.companies) || !(t.currency in sumary.companies[t.state].info);

    if (!t.pending) {
      switch (t.transaction_type) {
        case REVENUES_VALUE:
          sumary.revenues.qty += 1;
          sumary.revenues.amount += amount;
          sumary.totalGrowth.months[month].revenues += amount;
          sumary.totalGrowth.total += amount;
          if (newCompanyOrCurrency) {
            sumary.companies[t.account] = {
              info: {
                [t.currency]: {
                  revenuesQty: 1,
                  revenuesTotal: amount,
                  expensesQty: 0,
                  expensesTotal: 0
                }
              }
            }
          }
          else {
            sumary.companies[t.account].info[t.currency].revenuesQty += 1;
            sumary.companies[t.account].info[t.currency].revenuesTotal += amount;
          }
          if (newStateOrCurrency) {
            sumary.states[t.state] = {
              info: {
                [t.currency]: {
                  revenuesQty: 1,
                  revenuesTotal: amount,
                  expensesQty: 0,
                  expensesTotal: 0
                }
              }
            }
          }
          else {
            sumary.states[t.state].info[t.currency].revenuesQty += 1;
            sumary.states[t.state].info[t.currency].revenuesTotal += amount;
          }
          break;
        case EXPENSES_VALUE:
          sumary.expenses.qty += 1;
          sumary.expenses.amount += amount;
          sumary.totalGrowth.months[month].expenses += amount;
          sumary.totalGrowth.total += amount;
          if (newCompanyOrCurrency) {
            sumary.companies[t.account] = {
              info: {
                [t.currency]: {
                  revenuesQty: 0,
                  revenuesTotal: 0,
                  expensesQty: 1,
                  expensesTotal: amount
                }
              }
            }
          }
          else {
            sumary.companies[t.account].info[t.currency].expensesQty += 1;
            sumary.companies[t.account].info[t.currency].expensesTotal += amount;
          }
          if (newStateOrCurrency) {
            sumary.states[t.state] = {
              info: {
                [t.currency]: {
                  revenuesQty: 0,
                  revenuesTotal: 0,
                  expensesQty: 1,
                  expensesTotal: amount
                }
              }
            }
          }
          else {
            sumary.states[t.state].info[t.currency].expensesQty += 1;
            sumary.states[t.state].info[t.currency].expensesTotal += amount;
          }
          break;

      }
    }
    else {
      switch (t.transaction_type) {
        case REVENUES_VALUE:
          sumary.revenues.pending += 1;
          if(sumary.pendingTransactions[month])
            sumary.pendingTransactions[month].revenues += 1;
          else
            sumary.pendingTransactions[month] = {
            revenues: 1,
            expenses: 0
          }

          break;
        case EXPENSES_VALUE:
          sumary.expenses.pending += 1;
          if(sumary.pendingTransactions[month])
            sumary.pendingTransactions[month].expenses += 1;
          else
            sumary.pendingTransactions[month] = {
            revenues: 0,
            expenses: 1
          }
          break;
      }
    }
  });


  return Response.json({ sumary, account, state })
}


