// import NextAuth,{DefaultSession} from "next-auth"
// import {Prisma } from '@prisma/client';

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
    
//     user: Prisma.UserGetPayload<{
//         select:{
//           id:true,
//           name:true,
//           email:true
//           image:true, 
//           isAdmin:true,
//         }
//       }> & DefaultSession["user"] & {
//         type:string
//       }
//   } 
// }