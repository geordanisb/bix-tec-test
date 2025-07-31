'use server'

import { User } from "@/generated/prisma";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

export type FormState = {
    user?: User;
    error?: string;
    data?: FormData;
}
export async function createUser(state:FormState,data: FormData) {
    console.log('data ', data);
    const isAdmin = data.get('isAdmin') == 'on' ? 1 : 0;

    if(!data.get("name") || !data.get("email") || !data.get("password") || !data.get("image")) {
        return {error:"All fields are required",data};
    }
    if(data.get("password") !== data.get("passwordConfirmation")) {
        return {error:"Passwords do not match",data};
    }
    try{
        const password = await bcrypt.hash(data.get("password") as string,10);
        const user = await prisma.user.create({
            data: {
                name: data.get("name") as string,
                email: data.get("email") as string,
                password,
                image: data.get("image") as string,
                isAdmin  
            }
        });
        console.log("User created:", user);
        return {user,error:undefined};
    }
    catch (error) {
        console.error("Error creating user:", error);
        return {error:"An error occurred while creating the user",data};
    }
}