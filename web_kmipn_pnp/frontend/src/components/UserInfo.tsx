'use client'

import { useSession } from "next-auth/react"

export const UserName = () => {
    const session = useSession();

    if (session.status === "loading") return (
        <div className="skeleton w-32 h-7 rounded-full"></div>
    )

    return (
        <span>{session.data?.user?.name}</span>
    )
}