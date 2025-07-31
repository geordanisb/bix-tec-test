'use client'
import { getTransactions } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import { Transaction } from "@/generated/prisma";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import { CallReceived } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Chip, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";

export default function Revenues() {
    const [transactions] = useAtom(getTransactions);

    let totalAmount = 0;
    let revenuesQty = 0;
    transactions?.forEach((t: Transaction) => {
        if(t.transaction_type==REVENUES_VALUE && !t.pending){
            totalAmount += amountFromString(t.amount);
            revenuesQty++;
        }
    });

    return <Card sx={{
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
        title={<Typography variant="h5">Revenues <Chip sx={{color:'white'}} label={`${revenuesQty}`}/></Typography>}

        // subheader={}
      />

        <CardContent component={Stack} direction={'row'} justifyContent={'space-between'}>
        <Typography sx={{}} color='white' variant="h4">{formatAmountFromNumber(totalAmount)}</Typography>
        <Avatar><CallReceived color="success"/></Avatar>
        </CardContent>
        {/* <Box sx={{backgroundImage:'/cards/revenues.svg'}}>
        </Box> */}
    </Card>
}