'use client';
import { Box, Card, CardContent, CardHeader, Stack } from "@mui/material";
// import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import Revenues from "./cards/Revenues";
import { Transaction } from "@/generated/prisma";
import { useAtom } from "jotai";
import { transactionsStore } from "@/appStore";
import Expenses from "./cards/Expenses";
import BarRevenuesVsExpenses from "./charts/BarRevenuesVsExpenses";
import PiePendingVsApproved from "./charts/PiePendingVsApproved";
import TotalGrowth from "./cards/TotalGrowth";
import PendingTransactions from "./cards/PendingTransactions";
import Companies from "./cards/Companies";
import Pending from "./cards/Pending";
// import SignInForm from "./SignInForm";
// import { useRouter } from "next/navigation";

type Props = {
  transactionsPromise: Promise<Transaction[]>
}
export default function IndexCSC({ transactionsPromise }: Props) {
  const [, setTransactions] = useAtom(transactionsStore);

  const transactions = use(transactionsPromise);

  useEffect(() => {
    setTransactions(transactions);
  }, []);

  return <>
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
          <Companies/>
          <Pending/>
        </Stack>
      </Box>
    </Stack>

     

  </>
}