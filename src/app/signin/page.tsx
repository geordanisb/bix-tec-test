import { redirect } from "next/navigation";
import SignInCSC from "./(components)/SignInCSC";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export default async function SignIn() {
    const session = await getServerSession(authOptions);
    if (session)redirect('/');
    return <SignInCSC />;
}