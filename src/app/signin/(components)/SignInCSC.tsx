'use client'

import SignInForm from "@/app/(components)/SignInForm";
// import { CircularProgress } from "@mui/material";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function SignInCSC() {
    // const {data:session,status} = useSession();
    // const router = useRouter();
    // if(status === 'loading') return <CircularProgress/>
    // if(status === 'authenticated')  router.push('/');
    return <SignInForm/>
}