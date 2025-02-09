'use client'

import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AlertErrorSimple } from "../alert/AlertErrorSimple";
import { useSearchParams } from "next/navigation";
import InputPassword from "../InputPassword";
import Link from "next/link";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const [msg, setMsg] = useState<string | null>();
    const [forms, setForms] = useState({ "email": "", "password": "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setMsg(searchParams.get("msg"));
    }, [])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true)
            const result = await signIn("credentials", {
                email: forms.email,
                password: forms.password,
                redirect: false
            });

            if (!result?.ok) {
                setError(result?.status === 401 ? "Email or password is wrong" : "");
                return
            }
            window.location.reload();
        } catch (error: any) {
        } finally { setIsLoading(false) }
    }
    return (
        <form onSubmit={handleLogin}>
            {msg && (
                <div className="alert alert-info mb-3">{msg}</div>
            )}
            <div className="form-group">
                {error && <AlertErrorSimple error={error} />}
                <div className="form-field">
                    <label className="form-label">Alamat Email</label>
                    <input
                        name="email"
                        value={forms.email}
                        placeholder="exp: email@example.com"
                        type="email"
                        required
                        onChange={(e) => handleInputChange(e)}
                        className="input max-w-full" />
                </div>
                <div className="form-field">
                    <label className="form-label">
                        <span>Password</span>
                    </label>
                    <InputPassword
                        value={forms.password}
                        onChange={e => handleInputChange(e)}
                    />
                </div>
                <div className="form-field">
                    <div className="form-control justify-between">
                        <div className="flex gap-2">
                            <input type="checkbox" className="checkbox" />
                            <a href="#">Remember me</a>
                        </div>
                        <label className="form-label">
                            <Link href={"/auth/forgot-password"} className="link link-underline-hover link-primary text-sm">Forgot your password?</Link>
                        </label>
                    </div>
                </div>
                <div className="form-field pt-5">
                    <div className="form-control justify-between">
                        <button type="submit" disabled={isLoading} className={`btn ${isLoading && "btn-loading"} btn-primary w-full`}>{isLoading ? "Loading..." : "Login"}</button>
                    </div>
                </div>
            </div>
        </form >
    );
}