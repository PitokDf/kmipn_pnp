import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    // Panggil endpoint login API
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });

                    const data = await res.json();

                    if (res.ok && data.success) {
                        // Return data user dan token
                        return {
                            id: data.data.user.id,
                            name: data.data.user.name,
                            email: data.data.user.email,
                            role: data.data.user.role,
                            teamDataCompleate: data.data.teamDataCompleate,
                            accessToken: data.data.accessToken, // Simpan token di sesi
                        };
                    }

                    throw new Error(data.msg || 'Invalid login credentials');
                } catch (error: any) {
                    console.error('Login error:', error);
                    throw new Error(error.message || "Periksa semua inputan, pastikan semua benar.");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, trigger, user }) {
            // Simpan accessToken dari API ke token NextAuth
            if (trigger === "update") {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/check-team-compleate`, {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}` // Pastikan token disertakan
                        },
                    });

                    if (!res.ok) {
                        console.error("Error fetching team completion data:", res.status, await res.text());
                        throw new Error("Failed to fetch team completion data.");
                    }


                    const data = await res.json();
                    console.log(data);
                    token.teamDataCompleate = data.complete; // Update token
                } catch (error) {
                    console.error("JWT Update Error:", error);
                }

            }

            if (user) {
                const typedUser = user as User & { accessToken: string; teamDataCompleate: boolean };
                token.accessToken = typedUser.accessToken;
                token.teamDataCompleate = typedUser.teamDataCompleate;
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // Tambahkan accessToken ke sesi
            const customSession = session as any;
            customSession.accessToken = token.accessToken;
            customSession.teamDataCompleate = token.teamDataCompleate;
            customSession.user = token.user;
            return customSession;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET, // Pastikan secret ini aman
    pages: {
        signIn: '/auth/login', // Custom halaman login jika diperlukan
    },
};
