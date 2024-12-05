'use client'

import { Sidebar } from "@/components/sidebar/Sidebar";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppProgressBar } from "next-nprogress-bar";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row sm:gap-10">
            <Sidebar />
            <div className="flex w-full flex-col p-4">
                <label htmlFor="sidebar-mobile-fixed" className="sm:hidden">
                    <FontAwesomeIcon
                        icon={faBarsStaggered}
                        className="btn-ghost btn-xs btn"
                        style={{ color: "inherit" }}
                    />
                </label>
                <div className="my-4 gap-4">
                    <AppProgressBar
                        color="#29d"
                        shallowRouting={true}
                        options={{ showSpinner: false }}
                    />
                    {children}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}