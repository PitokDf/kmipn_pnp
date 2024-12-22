'use client'

import { FormEvent, useEffect, useState } from "react";
import { AlertErrorSimple } from "../alert/AlertErrorSimple";
import InputPassword from "../InputPassword";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [valid, setValid] = useState<boolean>(false)
    const [confirmationpassword, setConfirmationPassword] = useState("");
    const [error, setError] = useState("");
    const { token } = useParams();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await api.get(`/api/v1/reset-password/${token}`);
                console.log(res);
                setUserId(res.data.data);
                setValid(res.data.success);
            } catch (error: any) {
                setValid(error.response?.data?.success || false);
            }
        }
        checkToken();
    }, [token])

    if (!valid) return <p>Invalid or expire token</p>

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            if (password !== confirmationpassword) { setError("Password dan Konfirmasi Password harus sama!"); return }
            const response = await api.post("/api/v1/reset-password", { password, userId });
            if (response.data.success) {
                window.location.href = "/auth/login?msg=Password berhasil diubah. Silakan login dengan password baru Anda."
            }
        } catch (error: any) {
            setError(error.response.data.msg || "internal server error")
        } finally { setIsLoading(false) }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white dark:bg-zinc-800 shadow-md rounded p-8 w-full max-w-md">
                    <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                    <p className="mb-4">Masukkan password baru anda dibawah.</p>
                    {error && <AlertErrorSimple error={error} />}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="form-field">
                                <label className="form-label">New Password</label>
                                <InputPassword
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="form-field">
                                <label className="form-label">Confirmation Password</label>
                                <InputPassword
                                    value={confirmationpassword}
                                    className="mb-4"
                                    onChange={e => setConfirmationPassword(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className={`btn btn-md btn-success rounded-lg min-w-full ${isLoading && "btn-loading"}`}>{isLoading ? "Loading..." : "Reset Password"}</button>
                    </form>
                </div>
            </div>

        </>
    );
}