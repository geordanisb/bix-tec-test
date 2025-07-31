export type Transaction = {
    "date":string,
    "amount":string,
    "transaction_type":string,
    "currency":string,
    "account":string,
    "industry":string,
    "state":string
}

export type Sumary = {
    totalGrowth: {
      months: {
        revenues: number,
        expenses: number,
      }[],
      total: number
    },
    revenues: {
      qty: number;
      amount: number;
      pending: number;
    },
    expenses: {
      qty: number;
      amount: number;
      pending: number;
    },
    companies: Record<string, {
      info: Record<string, {//a key for every currency
        revenuesQty: number;
        expensesQty: number;
        revenuesTotal: number;
        expensesTotal: number;
      }>
    }>,
    pendingTransactions: {
      revenues: number,
      expenses: number,
    }[],
    states: Record<string, {
      info: Record<string, {//a key for every currency
        revenuesQty: number;
        expensesQty: number;
        revenuesTotal: number;
        expensesTotal: number;
      }>
    }>
  }