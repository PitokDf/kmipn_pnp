import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";
import ResendVerfikasiForm from "@/components/form/ResendVerfikasiForm";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white dark:bg-zinc-800 shadow-md rounded p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4">Resend Verifikasi Email</h1>
                <p className="mb-4">Masukkan email Anda untuk menerima link verifikasi email.</p>
                <ResendVerfikasiForm />
            </div>
        </div>
    );
}