import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const allowedPathByRole: { [key: string]: string[] } = {
    "participant": [
        "/participant",
        "/participant/team",
        "/participant/complete-team"
    ],
    "admin": [
        "/admin",
        "/admin/categories",
        "/admin/teams/proposal",
        "/admin/teams/submission",
        "/admin/teams/all",
        "/admin/users",
    ],
    "operator": [
        "/admin",
        "/admin/categories",
        "/admin/teams/proposal",
        "/admin/teams/submission",
        "/admin/teams/all"
    ]
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // jika user mengakses halaman login, biarkan mereka di halaman tersebut
        if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
            return NextResponse.next();
        }
        // jika user belum login, arahkan ke halaman login
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
    }

    if (token) {

        const currentTime = Math.floor(new Date().getTime() / 1000)
        const expire = token.exp;
        // jika token sudah expire, maka redirect pengguna ke halaman login
        if (currentTime > expire) {
            // jika si pengguna sudah di halaman login, yasudah biarin.
            if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
                return NextResponse.next();
            }

            return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
        }

        const roleUser: "admin" | "participant" | "operator" = token.user.role;
        const teamDataCompleate = token.teamDataCompleate;

        req.headers.set("Authorization", `Bearer ${token.accessToken}`);

        if (roleUser === "admin" || roleUser === "operator") {
            if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
                return NextResponse.redirect(new URL("/admin", req.nextUrl))
            }
        } else if (roleUser === "participant") {
            if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
                return NextResponse.redirect(new URL("/participant", req.nextUrl))
            }
        }

        if (roleUser === "participant" && !teamDataCompleate) {
            req.headers.set("Authorization", `Bearer ${token.accessToken}`)
            if (pathname.startsWith("/participant/complete-team")) {
                return NextResponse.next();
            }

            return NextResponse.redirect(new URL(`/participant/complete-team`, req.nextUrl))
        } else {
            if (pathname.startsWith("/participant/complete-team")) {
                return NextResponse.redirect(new URL(`/participant`, req.nextUrl))
            }
        }

        const allowedPath = allowedPathByRole[roleUser] || [];
        if (!allowedPath.includes(req.nextUrl.pathname)) {
            return NextResponse.rewrite(new URL("/unauthorized", req.nextUrl))
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/auth/login", "/auth/register", "/admin/:path*", "/participant/:path*"]
}