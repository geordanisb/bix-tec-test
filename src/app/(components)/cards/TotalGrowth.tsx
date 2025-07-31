'use client'
import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from "jotai";
import { getTransactions, isLoadingStore } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import StackedBarTotalGrowth from "../charts/StackedBarTotalGrowth";
import { Transaction } from "@/generated/prisma";
import { useEffect, useState } from "react";

export default function TotalGrowth(){
    const[transactionsResponse]=useAtom(getTransactions);
    let [totalRevenue,settotalRevenue] = useState(0); 
    const[isLoading]=useAtom(isLoadingStore)

    useEffect(()=>{
      if(transactionsResponse.state=='hasData' && transactionsResponse.data){
        totalRevenue=0;
        transactionsResponse.data.forEach((t:Transaction)=>{
            if(t.transaction_type==REVENUES_VALUE && !t.pending){
                totalRevenue+=amountFromString(t.amount);
            }
        });
        settotalRevenue(p=>totalRevenue)
      }
    },[transactionsResponse])

    return <Card sx={{width:'100%'}}>
          <CardHeader 
            title='Total Growth' 
            subheader={<Typography color="info">{isLoading ? '...' :formatAmountFromNumber(totalRevenue)}</Typography>}
            action={<IconButton><MenuIcon/></IconButton>}
          />
          <CardContent>
            <StackedBarTotalGrowth/>
          </CardContent>
        </Card>
}