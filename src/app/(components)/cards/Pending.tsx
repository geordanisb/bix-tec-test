'use client'
import { getTransactions } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import { Transaction } from "@/generated/prisma";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import { CallMade, CallReceived } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Chip, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";

export default function Pending() {
    const [transactions] = useAtom(getTransactions);

    let pendingQty = 0;
    let revenuesPendingQty = 0;
    let expensesPendingQty = 0;

    transactions?.forEach((t: Transaction) => {
        if(t.pending){
            revenuesPendingQty += t.transaction_type==REVENUES_VALUE ? 1 : 0;
            expensesPendingQty += t.transaction_type==REVENUES_VALUE ? 0 : 1;
            pendingQty ++;
        }
    });

    return <Card sx={{
        width: '100%',
        height: '185px',
        backgroundImage: `url('/cards/revenues.svg')`
    }}>
        <CardHeader
        sx={{color:'white'}}
        title={<Typography variant="h5" textAlign={'center'}>Pending Transactions <Chip sx={{color:'white'}} label={`${pendingQty}`}/></Typography>}
      />

        <CardContent component={Stack} direction={'row'} justifyContent={'space-evenly'}>
        {/* <Typography sx={{}} color='white' variant="h4">{pendingQty}</Typography> */}
        <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Avatar><CallReceived color="success"/></Avatar>
            <Typography color='white' variant="h4">{revenuesPendingQty}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Avatar><CallMade color="warning"/></Avatar>
            <Typography color='white' variant="h4">{expensesPendingQty}</Typography>
        </Stack>
        </CardContent>
        {/* <Box sx={{backgroundImage:'/cards/revenues.svg'}}>
        </Box> */}
    </Card>
}