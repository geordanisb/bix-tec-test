import { atom } from 'jotai';
import { loadable } from "jotai/utils";
import { Transaction } from './generated/prisma';
import { getLastNYearsYearName } from './utils';
import axios from 'axios';
import getTransactionsByYear from './actions/getTransactionsByYear';
import { Sumary } from '../types/model';


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
  year: number
}
const filtersInitialState = {
    account: '',
    industry: '',
    state: '',
    transaction_type: '',
    currency: 'brl',
    year: (new Date()).getFullYear()
  }
export const FiltersInitialState = filtersInitialState

export const appStore = atom({
  isLoading: false as boolean,
  filters: FiltersInitialState as FiltersState,
  notify: {
    open: false,
    message: '',
    severity: 'info' as 'info' | 'success' | 'warning' | 'error',
  } as NotifyState,
  transactions: {} as Sumary
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

export const yearFiltersStore = atom(
  (get) => get(appStore).filters.year,
  (get, set, year: number) => {
    set(appStore, (p) => ({
      ...p,
      filters:{
        ...p.filters,
        year
      }
    }));
  }
);

export const stateFiltersStore = atom(
  (get) => get(appStore).filters.state,
  (get, set, state: string) => {
    set(appStore, (p) => ({
      ...p,
      filters:{
        ...p.filters,
        state
      }
    }));
  }
);



export const getPeriodStore = atom(get=>get(yearFiltersStore));

export const transactionsStore = atom<Promise<Sumary>>(
  async (get) => {
    const year = get(getPeriodStore);
    const account = get(filtersStore).account;
    const state = get(stateFiltersStore);
    
    // const filterFn = (t:Sumary)=>{
    //   let q = true;
    //   if(account)q &&= t.account == account;
    //   if(state)q &&= t.state == state;
    //   return q;
    // }
    // const {data} = await axios.get(`http://localhost:3000/api/transactions/${year}`);
    // return data.transactions.filter((t:Transaction)=>filterFn(t));
    const sumary = await getTransactionsByYear(year,{account,state});
    return sumary//transactions.filter((t:any)=>filterFn(t));
  },
  
);
export const getTransactions = loadable(transactionsStore);


export const filtersStore = atom(
  (get) => get(appStore).filters,
  (get, set, filters: Partial<FiltersState>) => {
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

// export const getTransactions = atom(async get=>{
//   const filters = get(filtersStore);
//   let ts = await get(transactionsStore);
//   if(filters.account){
//     ts = ts.filter((t:any)=>t.account==filters.account);
//   }
//   return ts;
// })

