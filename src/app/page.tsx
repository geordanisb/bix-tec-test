// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import IndexCSC from "./(components)/IndexCSC";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
// import getTransactionsThisYear from "@/actions/getTransactionsThisYear";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // console.log('session from server',session);
  // const transactionsPromise = getTransactionsThisYear();
  return (
    <Suspense fallback={<CircularProgress/>}>
      <IndexCSC/>
    </Suspense>
  );
}
