'use client'
import { Card, CardContent, CardHeader, Chip, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from "jotai";
import { getTransactions, isLoadingStore } from "@/appStore";
import StackedBarPendingTransactions from "../charts/StackedBarPendingTransactions";
import { useEffect, useState } from "react";

export default function PendingTransactions(){
    const[sumaryResponse]=useAtom(getTransactions);
    let [data,setdata] = useState({revenues:0,expenses:0});
    const[isLoading]=useAtom(isLoadingStore) 

    useEffect(()=>{
      if(sumaryResponse.state=='hasData'&&sumaryResponse.data){
        data={revenues:sumaryResponse.data.revenues.pending,expenses:sumaryResponse.data.expenses.pending};
        // sumaryResponse.data.forEach((t:Transaction)=>{
        //     if(t.pending){
        //       if(t.transaction_type==REVENUES_VALUE)
        //         data.revenues++;
        //       else data.expenses ++;
        //     }
        // });
        setdata(d=>data);
      }
    },[sumaryResponse]);

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