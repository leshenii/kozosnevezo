import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import {NextResponse, NextRequest} from "next/server";

const isProtectedRoute = createRouteMatcher(['/profile(.*)', ])

export default clerkMiddleware(async (auth, req, res) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
    if (req.nextUrl.pathname.endsWith('projects') && req.nextUrl.searchParams.get('view') === null ) {
        return NextResponse.redirect(req.url + '?view=calendar');
    }
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};