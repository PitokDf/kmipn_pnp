'use client'

import { FormEvent, useState } from "react";
import { AlertErrorSimple } from "../alert/AlertErrorSimple";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ResendVerfikasiForm() {
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.post("/api/v1/resend-verifikasi", { email });
            setError("");
            setSuccess(response.data.msg);
            setEmail("");
        } catch (error: any) {
            setError(error.response.data?.errors?.errors[0].msg || error.response.data?.msg || "Internal server error")
        } finally { setIsLoading(false) }
    }
    return (
        <>
            {error && <AlertErrorSimple error={error} /> || success && <div className="alert alert-success mb-3">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <div className="form-field">
                        <label className="form-label">Alamat Email</label>
                        <input
                            placeholder="Masukkan email"
                            type="email"
                            className={`input max-w-full `}
                            name="email"
                            value={email || ''}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <label className="form-label">
                            <Link href={"/auth/register"} className="link link-underline-hover link-primary text-sm">Register</Link>
                        </label>
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className={`btn btn-md btn-success rounded-lg min-w-full ${isLoading && "btn-loading"}`}>{isLoading ? "Loading..." : "Resend Verifikasi Email"}</button>
            </form>
        </>
    );
}