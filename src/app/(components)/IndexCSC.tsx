'use client';
import { Box, Card, CardContent, CardHeader, CircularProgress, Container, Stack } from "@mui/material";
// import { useSession } from "next-auth/react";
import { Suspense, use, useEffect } from "react";
import Revenues from "./cards/Revenues";
import { Transaction } from "@/generated/prisma";
import { useAtom } from "jotai";
import { filtersStore, getTransactions, isLoadingStore, transactionsStore } from "@/appStore";
import Expenses from "./cards/Expenses";
import BarRevenuesVsExpenses from "./charts/BarRevenuesVsExpenses";
import PiePendingVsApproved from "./charts/PiePendingVsApproved";
import TotalGrowth from "./cards/TotalGrowth";
import PendingTransactions from "./cards/PendingTransactions";
import Companies from "./cards/Companies";
import Pending from "./cards/Pending";
import States from "./cards/States";
// import SignInForm from "./SignInForm";
// import { useRouter } from "next/navigation";

type Props = {
  // transactionsPromise: Promise<Transaction[]>
}
export default function IndexCSC() {
  // const [, setTransactions] = useAtom(transactionsStore);
  const[transactionsResponse]=useAtom(getTransactions);
  const[,setfilters]=useAtom(filtersStore);
  const[,setisLoadingStore]=useAtom(isLoadingStore);
  // const transactions = use(transactionsPromise);

  useEffect(() => {
    const filtersInLocalStorage = localStorage.getItem('filters');debugger;
    if(!!filtersInLocalStorage){
      const filters = JSON.parse(filtersInLocalStorage);
      setfilters(filters);
    }
  }, []);
  
  useEffect(()=>{
    setisLoadingStore(transactionsResponse.state=='loading');
  },[transactionsResponse])

  return <>
  <Suspense fallback={<CircularProgress/>}>

    <Stack direction={{ xs: 'column', lg: 'row' }} gap={2}>
      <Box>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <Revenues />
          <Expenses />
        </Stack>
        {/* <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <BarRevenuesVsExpenses />
          <PiePendingVsApproved />
        </Stack> */}

        <Stack gap={2} paddingTop={2}>
          <TotalGrowth />
          <PendingTransactions />
        </Stack>
       
      </Box>
      <Box>
        <Stack gap={2}>
          <Pending/>
          <Companies/>
          <States/>
        </Stack>
      </Box>
    </Stack>
  </Suspense>

     

  </>
}