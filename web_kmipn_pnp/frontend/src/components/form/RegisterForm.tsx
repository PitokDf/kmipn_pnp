'use client'

import { api } from "@/lib/api";
import { handleInputChange } from "@/lib/others_required";
import { FormEvent, useState } from "react";
import { AlertErrorSimple } from "../alert/AlertErrorSimple";

export default function RegisterForm() {
    const [form, setForm] = useState({ email: "", name: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ email: null, name: null, password: null });
    const [otherError, setOtherError] = useState<string | null>();
    const [successMsg, setSuccessMsg] = useState();

    const handleInputChang = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e, form, setForm);
    }

    const clear = () => {
        setErrors({ email: null, name: null, password: null });
        setOtherError(null);
        setForm({ email: "", name: "", password: "" });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await api.post("/api/v1/register", form, { headers: { "Content-Type": "application/json" } });
            console.log(response.data.msg);
            setSuccessMsg(response.data.msg);
            clear();
        } catch (error: any) {
            console.log(error);
            if (error.status === 400) {
                const errors = error.response.data.errors;
                setErrors(errors)
                if (error.status === 400) {
                    const errors = error.response.data.errors;
                    const newErrors: any = {}
                    if (Array.isArray(errors)) {
                        errors.forEach((error) => {
                            newErrors[error.path] = error.msg
                        });
                    } else {
                        setOtherError(errors)
                    }
                    setErrors(newErrors);
                }
            }
        } finally { setIsLoading(false) }
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                successMsg && (
                    <div className="alert alert-success mb-3">{successMsg}</div>
                )
            }
            {otherError && (<AlertErrorSimple error={otherError} />)}
            <div className="form-group">
                <div className="form-field">
                    <label className="form-label">Nama Lengkap</label>
                    <input
                        placeholder="Masukkan nama lengkap"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => handleInputChang(e)}
                        className={`input max-w-full ${errors.name && "input-error"}`}
                    />
                    {errors.name && (
                        <label className="form-label">
                            <span className="form-label-alt text-error">{errors.name}.</span>
                        </label>
                    )}
                </div>
                <div className="form-field">
                    <label className="form-label">Alamat Email</label>
                    <input
                        placeholder="Masukkan email"
                        type="email"
                        className={`input max-w-full ${errors.email && "input-error"}`}
                        value={form.email}
                        onChange={(e) => handleInputChang(e)}
                        name="email"
                    />
                    {errors.email && (
                        <label className="form-label">
                            <span className="form-label-alt text-error">{errors.email}.</span>
                        </label>
                    )}
                </div>
                <div className="form-field">
                    <label className="form-label">
                        <span>Password</span>
                    </label>
                    <div className="form-control">
                        <input
                            placeholder="*******"
                            type="password"
                            value={form.password}
                            className={`input max-w-full ${errors.password && "input-error"}`}
                            onChange={(e) => handleInputChang(e)}
                            name="password" />
                    </div>
                    {errors.password && (
                        <label className="form-label">
                            <span className="form-label-alt text-error">{errors.password}.</span>
                        </label>
                    )}
                </div>
                <div className="form-field pt-5">
                    <div className="form-control justify-between">
                        <button type="submit" disabled={isLoading} className={`btn btn-primary w-full ${isLoading && "btn-loading"}`}>{isLoading ? "Loading..." : "Register"}</button>
                    </div>
                </div>
            </div>
        </form>
    );
}