import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export default function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.has('authToken'); 
    const isLoginPage = request.nextUrl.pathname === '/ingreso';

    if (!isLoggedIn && !isLoginPage) {
        const returnUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
        const loginUrl = new URL(`/ingreso?returnUrl=${returnUrl}`, request.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();

}

export const config = {
    matcher: ['/horarios/reserva/:path*', '/buscar', '/cancha/:path*']
}