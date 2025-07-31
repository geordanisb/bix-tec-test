'use client'
import { getTransactions, isLoadingStore } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import { Transaction } from "@/generated/prisma";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import { CallReceived } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Revenues() {
    const [sumaryResponse] = useAtom(getTransactions);
    const[isLoading]=useAtom(isLoadingStore);
    let [data,setdata] = useState({totalAmount:0,revenuesQty:0});
    useEffect(()=>{
        if(sumaryResponse.state=='hasData'&&sumaryResponse.data){
            setdata(p=>({totalAmount:sumaryResponse.data.revenues.amount,revenuesQty:sumaryResponse.data.revenues.qty}))
        }
    },[sumaryResponse])

    return <Card data-testid="revenues-card" sx={{
        width: '350px',
        height: '185px',
        backgroundImage: `url('/cards/revenues.svg')`
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
        title={<Typography variant="h5">Revenues
        {
            <Chip sx={{color:'white'}} label={
                `${isLoading ? '...' : data.revenuesQty}`
            }/>

        } 
        </Typography>}

        // subheader={}
      />

        <CardContent component={Stack} direction={'row'} justifyContent={'space-between'}>
        <Typography data-testid="revenues-card-amount" color='white' variant="h4">{
           isLoading ? <CircularProgress/> : formatAmountFromNumber(data.totalAmount)
        }</Typography>
        <Avatar><CallReceived color="success"/></Avatar>
        </CardContent>
        {/* <Box sx={{backgroundImage:'/cards/revenues.svg'}}>
        </Box> */}
    </Card>
}