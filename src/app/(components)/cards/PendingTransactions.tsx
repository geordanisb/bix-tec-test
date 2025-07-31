import { Card, CardContent, CardHeader, Chip, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from "jotai";
import { getTransactions } from "@/appStore";
import { REVENUES_VALUE } from "@/constants";
import StackedBarPendingTransactions from "../charts/StackedBarPendingTransactions";

export default function PendingTransactions(){
    const[transactions]=useAtom(getTransactions);
    let revenues = 0; 
    let expenses = 0; 

    transactions.forEach(t=>{
        if(t.pending){
          if(t.transaction_type==REVENUES_VALUE)
            revenues++;
          else expenses ++;
        }
    });

    return <Card sx={{width:'100%'}}>
          <CardHeader 
            title='Pending Transactions' 
            subheader={<Stack gap={1} direction={'row'}>
              <Chip color='success' label={`Revenues: ${revenues}`}/>
              <Chip color='warning' label={`Expenses: ${expenses}`}/>
            </Stack>}
            action={<IconButton><MenuIcon/></IconButton>}
          />
          <CardContent>
            <StackedBarPendingTransactions/>
          </CardContent>
        </Card>
}