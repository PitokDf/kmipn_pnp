import LoginForm from "@/components/form/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-6">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-semibold">Login</h1>
                    <p className="text-sm">Login untuk mengakses akunmu</p>
                </div>
                <LoginForm />
                <div className="flex justify-between mt-6">
                    <div className="form-control">
                        <Link href="/auth/register" className="link link-underline-hover link-primary text-sm">Belum punya akun? Register</Link>
                    </div>
                    <label className="form-label">
                        <Link href="/" className="link link-underline-hover link-warning text-sm">Kembali ke Homepage?</Link>
                    </label>
                </div>
            </div>
        </div>
    );
}