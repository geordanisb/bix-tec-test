'use client'
import { Card, CardContent, CardHeader, Chip, CircularProgress, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from "jotai";
import { getTransactions, isLoadingStore } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import StackedBarPendingTransactions from "../charts/StackedBarPendingTransactions";
import { Transaction } from "@/generated/prisma";
import { useEffect, useState } from "react";

export default function PendingTransactions(){
    const[transactionsResponse]=useAtom(getTransactions);
    let [data,setdata] = useState({revenues:0,expenses:0});
    const[isLoading]=useAtom(isLoadingStore) 

    useEffect(()=>{
      if(transactionsResponse.state=='hasData'&&transactionsResponse.data){
        data={revenues:0,expenses:0};
        transactionsResponse.data.forEach((t:Transaction)=>{
            if(t.pending){
              if(t.transaction_type==REVENUES_VALUE)
                data.revenues++;
              else data.expenses ++;
            }
        });
        setdata(d=>data);
      }
    },[transactionsResponse]);

    return <Card sx={{width:'100%'}}>
          <CardHeader 
            title='Pending Transactions' 
            subheader={<Stack gap={1} direction={'row'}>
              <Chip color='success' label={`Revenues: ${isLoading ? '...' : data.revenues}`}/>
              <Chip color='warning' label={`Expenses: ${isLoading ? '...' : data.expenses}`}/>
            </Stack>}
            action={<IconButton><MenuIcon/></IconButton>}
          />
          <CardContent>
            <StackedBarPendingTransactions/>
          </CardContent>
        </Card>
}