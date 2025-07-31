import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const session = req.nextauth.token;
console.log('session from middleware', session);
    if(session) {
      console.log('req.url', req.url);
        if(req.url.includes('/signin'))
            return NextResponse.redirect(new URL('/', req.url));    
        else if(!session.isAdmin && req.url.includes('/user'))
            return NextResponse.redirect(new URL('/', req.url));
        return NextResponse.next();
    }
    // else NextResponse.next();
    else
        return NextResponse.redirect(new URL('/signin', req.url));
  },
  {
    // callbacks:{
    //   authorized:(params)=>true
    // },
    pages: {
      signIn: '/signin',
    //   error: '/signin'
    }
  }
)

export const config = { 
    matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ]
}