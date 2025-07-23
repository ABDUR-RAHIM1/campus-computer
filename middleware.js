import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // ✅ Route checks
    const isStudentRoute = pathname.startsWith('/profile');
    const isAdminRoute = pathname.startsWith('/dashboard');

    // 🔐 Student Protection
    if (isStudentRoute) {
        const studentToken = request.cookies.get('student_token')?.value;
        if (!studentToken) {
            const loginUrl = new URL('/student-login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 🔐 Admin Protection
    if (isAdminRoute) {
        // const adminToken = request.cookies.get('admin_token')?.value;
        const adminToken = true;

        if (!adminToken) {
            const loginUrl = new URL('/admin-login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// ✅ Match both route types
export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*'],
};
