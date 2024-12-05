'use client'

import { useEffect, useState } from "react";
import { NextAuthProvider } from "./Provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const [isPageLoading, setIsPageLoading] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setIsPageLoading(true);
        }

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => { window.removeEventListener("load", handleLoad) }
    }, [])
    return (
        !isPageLoading ? (
            <div className="h-screen flex justify-center items-center">
                <div className="spinner-wave">
                    <div className="spinner-wave-dot"></div>
                    <div className="spinner-wave-dot"></div>
                    <div className="spinner-wave-dot"></div>
                    <div className="spinner-wave-dot"></div>
                </div>
            </div>)
            : (
                <NextAuthProvider>
                    {children}
                    <ToastContainer />
                </NextAuthProvider>
            )
    );
}