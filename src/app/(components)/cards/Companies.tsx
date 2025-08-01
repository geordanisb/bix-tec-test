'use client'
import { Avatar, Card, CardContent, CardHeader, CircularProgress, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from "jotai";
import { FiltersInitialState, filtersStore, getTransactions, isLoadingStore } from "@/appStore";
import { EXPENSES_VALUE } from "@/constants";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import { AccountBalance, AttachMoney, CallMade, CallReceived, LocalAtm, Numbers, RestartAlt } from "@mui/icons-material";
import { Transaction } from "@/generated/prisma";
import { useEffect, useState } from "react";

export default function Companies() {
  const [sumaryResponse] = useAtom(getTransactions);
  const [filters,setfilters] = useAtom(filtersStore);
  const[isLoading]=useAtom(isLoadingStore);
  let [companies,setcompanies]=useState<Record<string, {
    info: Record<string, {//a key for every currency
      revenuesQty: number;
      expensesQty: number;
      revenuesTotal: number;
      expensesTotal: number;
    }>
  }>>({});

  const resetFilters = () => {
      // const inLocalStorage = localStorage.getItem('filters');
      // const filters = inLocalStorage ? JSON.parse(inLocalStorage) : FiltersInitialState;
      setfilters({...filters,account:''});
    }

  useEffect(()=>{
    if(sumaryResponse.state=='hasData'&&sumaryResponse.data){
      companies=sumaryResponse.data.companies;
      // sumaryResponse.data.forEach((t:Transaction) => {
      //   if (!t.pending) {
      //     if (t.account in companies) {
      //       const info = companies[t.account].info;
      //       if (t.currency in info) {
      //         info[t.currency].expensesQty += t.transaction_type == EXPENSES_VALUE ? 1 : 0;
      //         info[t.currency].revenuesQty += t.transaction_type == EXPENSES_VALUE ? 0 : 1;
      //         info[t.currency].expensesTotal += t.transaction_type == EXPENSES_VALUE ? amountFromString(t.amount) : 0;
      //         info[t.currency].revenuesTotal += t.transaction_type == EXPENSES_VALUE ? 0 : amountFromString(t.amount);
      //       }
      //       else {
      //         info[t.currency] = {
      //           expensesQty: t.transaction_type == EXPENSES_VALUE ? 1 : 0,
      //           revenuesQty: t.transaction_type == EXPENSES_VALUE ? 0 : 1,
      //           expensesTotal: t.transaction_type == EXPENSES_VALUE ? amountFromString(t.amount) : 0,
      //           revenuesTotal: t.transaction_type == EXPENSES_VALUE ? 0 : amountFromString(t.amount)
      //         }
      //       }
      //     }
      //     else {
      //       companies[t.account] = {
      //         info: {
      //           [t.currency]: {
      //             expensesQty: t.transaction_type == EXPENSES_VALUE ? 1 : 0,
      //             revenuesQty: t.transaction_type == EXPENSES_VALUE ? 0 : 1,
      //             expensesTotal: t.transaction_type == EXPENSES_VALUE ? amountFromString(t.amount) : 0,
      //             revenuesTotal: t.transaction_type == EXPENSES_VALUE ? 0 : amountFromString(t.amount)
      //           }
      //         }
      //       }
      //     }
      //   }
      // });
      // if(!sumaryResponse.data.length)
      //   setcompanies(p=>({}))
      // else
        setcompanies(p=>({...companies}));
    }
  },[sumaryResponse])

  function onAccountSelected(account:string){
    setfilters({account});
  }

  return <Card sx={{maxWidth:'370px'}}>
    <CardHeader
      title='Empresas'
      subheader={<Typography color="info">with transactions in the period</Typography>}
      action={<IconButton onClick={resetFilters}><RestartAlt /></IconButton>}
    />
    <CardContent sx={{height:'40dvh',overflow:'scroll' }}>
      {
        isLoading
          ? <CircularProgress/>
          : <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><Avatar><AccountBalance color="info" /></Avatar></TableCell>
              <TableCell><Avatar><CallReceived color='success' /></Avatar></TableCell>
              <TableCell><Avatar><CallMade color='warning' /></Avatar></TableCell>
              <TableCell><Avatar><LocalAtm color="info"/></Avatar></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.entries(companies).map(([account, value], idx) => {
                return Object.entries(value.info).map(([currency, info]) => {
                  return <TableRow sx={{cursor:'pointer'}} onClick={()=>onAccountSelected(account)} key={account + currency}>
                    <TableCell>{account}</TableCell>
                    <TableCell>
                      <Stack direction={'row'}>
                        <CallReceived color="success"/>
                        <Typography color="success">{info.revenuesQty}</Typography>
                      </Stack>
                      <Stack direction={'row'}>
                        <AttachMoney color="success"/>
                        <Typography color="success">{formatAmountFromNumber(info.revenuesTotal,currency)}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction={'row'}>
                        <CallMade color="warning"/>
                        <Typography color="warning">{info.expensesQty}</Typography>
                      </Stack>
                      <Stack direction={'row'}>
                        <AttachMoney color="warning"/>
                        <Typography color="warning">{formatAmountFromNumber(info.expensesTotal,currency)}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell><Typography color="info">{currency.toUpperCase()}</Typography></TableCell>
                  </TableRow>
                })
              })

            }
          </TableBody>
        </Table>
      </TableContainer>
      }
      
    </CardContent>
  </Card>
}