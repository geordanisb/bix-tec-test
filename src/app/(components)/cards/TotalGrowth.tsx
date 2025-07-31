'use client'
import { Card, CardContent, CardHeader, IconButton,  Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from "jotai";
import { getTransactions, isLoadingStore } from "@/appStore";
import { formatAmountFromNumber } from "@/utils";
import StackedBarTotalGrowth from "../charts/StackedBarTotalGrowth";
import { useEffect, useState } from "react";

export default function TotalGrowth(){
    const[sumaryResponse]=useAtom(getTransactions);
    let [totalRevenue,settotalRevenue] = useState(0); 
    const[isLoading]=useAtom(isLoadingStore)

    useEffect(()=>{
      if(sumaryResponse.state=='hasData' && sumaryResponse.data){
        totalRevenue=sumaryResponse.data.totalGrowth.total;
        
        settotalRevenue(p=>totalRevenue)
      }
    },[sumaryResponse])

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