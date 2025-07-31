'use client'
import { getTransactions } from "@/appStore";
import { Transaction } from "@/generated/prisma";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import { Avatar, Card, CardContent, CardHeader, Chip, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { EXPENSES_VALUE } from "@/constants";
import { CallMade } from "@mui/icons-material";

export default function Expenses() {
    const [transactions] = useAtom(getTransactions);

    let totalAmount = 0;
    let expensesQty=0;
    transactions?.forEach((t: Transaction) => {
        if(t.transaction_type==EXPENSES_VALUE && !t.pending){
            totalAmount += amountFromString(t.amount);
            expensesQty++;
        }
    });

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
        title={<Typography variant="h5">Expenses <Chip sx={{color:'white'}} label={`${expensesQty}`}/></Typography>}
        // subheader={}
      />

        <CardContent component={Stack} direction={'row'} justifyContent={'space-between'}>
        <Typography sx={{}} color='white' variant="h4">{formatAmountFromNumber(totalAmount)}</Typography>
        <Avatar><CallMade color="warning"/></Avatar>
        </CardContent>
        {/* <Box sx={{backgroundImage:'/cards/revenues.svg'}}>
        </Box> */}
    </Card>
}