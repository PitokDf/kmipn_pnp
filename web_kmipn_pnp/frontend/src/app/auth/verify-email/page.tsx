'use client'

import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerfiyEmail() {
    const [msg, setMsg] = useState("memverifikasi...");
    const token = useSearchParams();
    const tokenUnique = token.get("token");
    useEffect(() => {
        const verfiyEmail = async () => {
            try {
                const res = await api.post(`/api/v1/verify-email?token=${tokenUnique}`);
                if (res.data.success) {
                    setMsg(res.data.msg);
                    setInterval(() => {
                        setMsg("redirect")
                        setInterval(() => {
                            window.location.href = "/auth/login?msg=Email+berhasil+diverifikasi,+silahkan+login.";
                        }, 1000);
                    }, 1500);
                }
            } catch (error: any) {
                setMsg(error?.response?.data?.msg)
            }
        }
        verfiyEmail();
    }, [tokenUnique]);
    return (
        <div>
            {msg}
        </div>
    );
}