import { NextResponse } from 'next/server';

// Middleware function
export function middleware(request) {
    const { pathname } = request.nextUrl;

    console.log("middlewere Calling...")

    // Check if the path starts with /profile
    const isProtectedRoute = pathname.startsWith('/profile');

    if (isProtectedRoute) {
        const token = request.cookies.get('student_token')?.value;

        // If no token is found, redirect to /student-login
        if (!token) {
            const loginUrl = new URL('/student-login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Allow the request if everything is fine
    return NextResponse.next();
}

// Matcher config: applies middleware only on /profile and its subroutes
export const config = {
    matcher: ['/profile/:path*'],
};
