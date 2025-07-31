'use client'
import { getTransactions, isLoadingStore } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import { Transaction } from "@/generated/prisma";
import { CallMade, CallReceived } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Chip, CircularProgress, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Pending() {
    const [transactionsResponse] = useAtom(getTransactions);
    const[isLoading]=useAtom(isLoadingStore)

    let [data, setdata] = useState({ pendingQty: 0, revenuesPendingQty: 0, expensesPendingQty: 0 });
    useEffect(() => {
        if (transactionsResponse.state == 'hasData' && transactionsResponse.data) {
            data.revenuesPendingQty=0;
            data.expensesPendingQty=0;
            data.pendingQty=0;
            transactionsResponse.data?.forEach((t: Transaction) => {
                if (t.pending) {
                    data.revenuesPendingQty += t.transaction_type == REVENUES_VALUE ? 1 : 0;
                    data.expensesPendingQty += t.transaction_type == REVENUES_VALUE ? 0 : 1;
                    data.pendingQty++;
                }
            });
            setdata(p => ({...data}))
        }
    }, [transactionsResponse])

    return <Card sx={{
        width: '100%',
        height: '185px',
        backgroundImage: `url('/cards/pending.svg')`
    }}>
        <CardHeader
            sx={{ color: 'white' }}
            title={<Typography variant="h5" textAlign={'center'}>Pending Transactions <Chip sx={{ color: 'white' }} label={`${isLoading? '...' : data.pendingQty}`} /></Typography>}
        />

        <CardContent component={Stack} direction={'row'} justifyContent={'space-evenly'}>
            {/* <Typography sx={{}} color='white' variant="h4">{pendingQty}</Typography> */}
            <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Avatar><CallReceived color="success" /></Avatar>
                <Typography color='white' variant="h4">{isLoading ? <CircularProgress/> : data.revenuesPendingQty}</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Avatar><CallMade color="warning" /></Avatar>
                <Typography color='white' variant="h4">{isLoading ? <CircularProgress/> : data.expensesPendingQty}</Typography>
            </Stack>
        </CardContent>
        {/* <Box sx={{backgroundImage:'/cards/revenues.svg'}}>
        </Box> */}
    </Card>
}