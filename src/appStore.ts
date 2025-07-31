import { atom } from 'jotai';
import { Transaction } from './generated/prisma';
import { getLastNYearsYearName } from './utils';

export type NotifyState = {
  open: boolean;
  message: string;
  severity: 'info' | 'success' | 'warning' | 'error';
}

export const FiltersStatePeriodHash = {
  twoYearsBefore:getLastNYearsYearName(2),
  oneYearBefore:getLastNYearsYearName(1),
  thisYear:(new Date()).getFullYear(),
}
// [key, value] matrix for periods


export type FiltersStatePeriod = keyof  typeof FiltersStatePeriodHash;

export type FiltersState = {
  account: string;
  industry: string;
  state: string;
  transaction_type: string;
  currency: string;
  period: FiltersStatePeriod
}
export const FiltersInitialState = {
    account: '',
    industry: '',
    state: '',
    transaction_type: '',
    currency: 'brl',
    period: 'thisYear'
  }

export const appStore = atom({
  isLoading: false as boolean,
  filters: FiltersInitialState as FiltersState,
  notify: {
    open: false,
    message: '',
    severity: 'info' as 'info' | 'success' | 'warning' | 'error',
  } as NotifyState,
  transactions: [] as Transaction[]
});

export const notifyStore = atom(
  (get) => get(appStore).notify,
  (get, set, newState: Record<string, any>) => {
    set(appStore, (p) => ({
      ...p,
      notify: { ...p.notify, ...newState }
    }));
  }
)

export const isLoadingStore = atom(
  (get) => get(appStore).isLoading,
  (get, set, newState: boolean) => {
    set(appStore, (p) => ({
      ...p,
      isLoading: newState
    }));
  }
);

export const periodFiltersStore = atom(
  (get) => get(appStore).filters.period,
  (get, set, newState: FiltersStatePeriod) => {
    set(appStore, (p) => ({
      ...p,
      filters:{
        ...p.filters,
        period:newState
      }
    }));
  }
);

export const transactionsStore = atom(
  (get) => get(appStore).transactions,
  (get, set, transactions: Transaction[]) => {
    set(appStore, (p) => ({
      ...p,
      transactions
    }));
  }
);

export const filtersStore = atom(
  (get) => get(appStore).filters,
  (get, set, filters: Partial<FiltersState>) => {
    debugger;
    // let ts = get(transactionsStore);
    // ts = ts.filter(t=>{
    //   if(filters.account){
    //     return t.account == filters.account;
    //   }
    // });

    set(appStore, (p) => ({
      ...p,
      // transactions:ts,
      filters:{...p.filters,...filters}
    }));
  }
);

export const getTransactions = atom(get=>{
  const filters = get(filtersStore);
  let ts = get(transactionsStore);
  if(filters.account){
    ts = ts.filter(t=>t.account==filters.account);
  }
  return ts;
})

