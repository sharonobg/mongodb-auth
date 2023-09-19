import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //from doc: return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/sign-up'
    const token = request.cookies.get('token') ?.value || ''
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  //from doc: matcher: '/about/:path*',
  matcher:[
    '/',
    '/profile',
    '/login',
    '/sign-up',
  ]
}