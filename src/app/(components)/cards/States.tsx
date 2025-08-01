'use client'
import { Avatar, Card, CardContent, CardHeader, CircularProgress, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { FiltersInitialState, filtersStore, getTransactions, isLoadingStore } from "@/appStore";
import { EXPENSES_VALUE } from "@/constants";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import { AttachMoney, CallMade, CallReceived, LocalAtm, Numbers, RestartAlt, SouthAmerica } from "@mui/icons-material";
import { Transaction } from "@/generated/prisma";
import { useEffect, useState } from "react";

export default function States() {
  const [sumaryResponse] = useAtom(getTransactions);
  const [, setfilters] = useAtom(filtersStore);
  const [isLoading] = useAtom(isLoadingStore)

  let [states, setstates] = useState<Record<string, {
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
    setfilters({state:''});
  }

  useEffect(() => {
    if (sumaryResponse.state == 'hasData' && sumaryResponse.data) {
      states = sumaryResponse.data.states;
      setstates(p => ({ ...states }));
    }
  }, [sumaryResponse])

  function onStateSelected(state: string) {
    setfilters({ state });
  }

  return <Card sx={{ maxWidth: '370px' }}>
    <CardHeader
      title='States'
      subheader={<Typography color="info">with transactions in the period</Typography>}
      action={<IconButton onClick={resetFilters}><RestartAlt /></IconButton>}
    />
    <CardContent sx={{ height: '40dvh', overflow: 'scroll' }}>
      {
        isLoading ? <CircularProgress />
          : <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><Avatar><SouthAmerica color="info" /></Avatar></TableCell>
                  <TableCell><Avatar><CallReceived color='success' /></Avatar></TableCell>
                  <TableCell><Avatar><CallMade color='warning' /></Avatar></TableCell>
                  <TableCell><Avatar><LocalAtm color="info" /></Avatar></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Object.entries(states).map(([state, value], idx) => {
                    return Object.entries(value.info).map(([currency, info]) => {
                      return <TableRow sx={{ cursor: 'pointer' }} onClick={() => onStateSelected(state)} key={state + currency}>
                        <TableCell>{state}</TableCell>
                        <TableCell>
                          <Stack direction={'row'}>
                            <CallReceived color="success" />
                            <Typography color="success">{info.revenuesQty}</Typography>
                          </Stack>
                          <Stack direction={'row'}>
                            <AttachMoney color="success" />
                            <Typography color="success">{formatAmountFromNumber(info.revenuesTotal,currency)}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack direction={'row'}>
                            <CallMade color="warning" />
                            <Typography color="warning">{info.expensesQty}</Typography>
                          </Stack>
                          <Stack direction={'row'}>
                            <AttachMoney color="warning" />
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