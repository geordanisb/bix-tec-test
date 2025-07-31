import { Box, CircularProgress } from "@mui/material";
import UsersDataGrid from "./(components)/UsersDataGrid";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default function User() {
  const usersPromise = prisma.user.findMany();

  return <>
    <Box sx={{ height: 400, width: '100%' }}>
      <Suspense fallback={<CircularProgress />}>
        <UsersDataGrid usersPromise={usersPromise}/>
      </Suspense>
    </Box>
  </>;
}