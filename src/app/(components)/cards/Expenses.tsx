'use client'
import { getTransactions, isLoadingStore } from "@/appStore";
import { Transaction } from "@/generated/prisma";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import { Avatar, Card, CardContent, CardHeader, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { EXPENSES_VALUE } from "@/constants";
import { CallMade } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Expenses() {
    const [transactionsResponse] = useAtom(getTransactions);
    let [data,setdata] = useState({totalAmount:0,expensesQty:0});
    const [isLoading]=useAtom(isLoadingStore)

    useEffect(()=>{
        if(transactionsResponse.state=='hasData'&&transactionsResponse.data){
            data={totalAmount:0,expensesQty:0};
            transactionsResponse.data?.forEach((t: Transaction) => {
                if(t.transaction_type==EXPENSES_VALUE && !t.pending){
                    data.totalAmount += amountFromString(t.amount);
                    data.expensesQty++;
                }
            });
            if(!transactionsResponse.data.length){
                data.expensesQty=0;
                data.totalAmount=0;
            }
            setdata(p=>({...data}));
        }
    },[transactionsResponse])

    return <Card sx={{
        width: '350px',
        height: '185px',
        backgroundImage: `url('/cards/expenses.svg')`
    }}>
        <CardHeader
        sx={{color:'white'}}
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        // action={
        //   <PeriodFilter sx={{color:'white'}} />
        // }
        title={<Typography variant="h5">Expenses {
            <Chip sx={{color:'white'}} label={`${isLoading ? '...' :data.expensesQty}`}/>
        }</Typography>}
        // subheader={}
      />

        <CardContent component={Stack} direction={'row'} justifyContent={'space-between'}>
        <Typography sx={{}} color='white' variant="h4">{
           isLoading ? <CircularProgress/> : formatAmountFromNumber(data.totalAmount)
        }</Typography>
        <Avatar><CallMade color="warning"/></Avatar>
        </CardContent>
        {/* <Box sx={{backgroundImage:'/cards/revenues.svg'}}>
        </Box> */}
    </Card>
}