import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from "jotai";
import { getTransactions } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import { amountFromString, formatAmountFromNumber } from "@/utils";
import StackedBarTotalGrowth from "../charts/StackedBarTotalGrowth";

export default function TotalGrowth(){
    const[transactions]=useAtom(getTransactions);
    let totalRevenue = 0; 

    transactions.forEach(t=>{
        if(t.transaction_type==REVENUES_VALUE && !t.pending){
            totalRevenue+=amountFromString(t.amount);
        }
    });

    return <Card sx={{width:'100%'}}>
          <CardHeader 
            title='Total Growth' 
            subheader={<Typography color="info">{formatAmountFromNumber(totalRevenue)}</Typography>}
            action={<IconButton><MenuIcon/></IconButton>}
          />
          <CardContent>
            <StackedBarTotalGrowth/>
          </CardContent>
        </Card>
}