'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarItems } from "./sidebarItems";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import "./sidebar.module.css";
import { useSession } from "next-auth/react";
import Logout from "../Logout";

export const Sidebar = () => {
    const pathName = usePathname()
    const session: any = useSession();
    const roleUser: "admin" | "participant" | "operator" = session.data?.user?.role;

    return (
        <div className="sm:w-full sm:max-w-[18rem] z-50">
            <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
            <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay"></label>
            <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
                <section className="sidebar-title items-center p-4">
                    <svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg">
                        <rect height="100%" rx="16" width="100%"></rect>
                        <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                    <div className="flex flex-col">
                        <span>KMIPN VII</span>
                    </div>
                </section>
                <section className="sidebar-content">
                    {
                        !session ? (
                            <div className="flex h-full justify-center items-center">
                                <div className="spinner-sm spinner-circle"></div>
                            </div>
                        ) : (
                            <nav className="menu rounded-md">
                                {
                                    SidebarItems.filter((item) => item.access.includes(roleUser)).map((sdbr, index) => (
                                        <React.Fragment key={"fragment-" + index}>
                                            <section key={"sidebar-" + index} className="menu-section px-4">
                                                <span className="menu-title">{sdbr.title}</span>
                                                <ul key={`sidebar-ul-${index}`} className="menu-items ">
                                                    {sdbr.children.sort((a, b) => a.title.localeCompare(b.title)).filter((item) => item.access.includes(roleUser)).map((sdbItem, index_) =>
                                                        sdbItem.children ? (
                                                            <li key={"sidebar-item-" + index_}>
                                                                <input type="checkbox" id={"sidebar-menu-" + index + index_} className="menu-toggle" />
                                                                <label className={`menu-item ${sdbItem.children.map((route) => route.route).includes(pathName) ? "menu-active" : ""} justify-between`} htmlFor={"sidebar-menu-" + index + index_}>
                                                                    <div className="flex gap-2">
                                                                        <FontAwesomeIcon icon={sdbItem.icon} width={20} height={20} className="opacity-75" />
                                                                        <span>{sdbItem.title}</span>
                                                                    </div>
                                                                    <span className="menu-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </span>
                                                                </label>
                                                                <div className="menu-item-collapse">
                                                                    <div className="min-h-0">
                                                                        {
                                                                            sdbItem.children.sort((a, b) => a.title.localeCompare(b.title)).map((sdbItemChild, index) => (
                                                                                <Link href={sdbItemChild.route} key={"sdbitemChild-" + index} className="menu-item ml-6">
                                                                                    <label >{sdbItemChild.title}</label>
                                                                                </Link>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ) :
                                                            (
                                                                <li key={"sidebar-item-" + index_} >
                                                                    <Link href={sdbItem.route} className={`menu-item ${pathName === sdbItem.route ? "menu-active" : ""}`}>
                                                                        <FontAwesomeIcon icon={sdbItem.icon} width={20} height={20} className="opacity-75" />
                                                                        <span>{sdbItem.title}</span>
                                                                    </Link>
                                                                </li>
                                                            )
                                                    )}
                                                </ul>
                                            </section>
                                            {SidebarItems.slice().pop()?.title != sdbr.title ? (<div className="divider my-0"></div>) : ""}
                                        </React.Fragment>
                                    ))
                                }
                            </nav>
                        )
                    }
                </section>
                <section className="justify-end pt-2">
                    <div className="divider my-0"></div>
                    <Logout />
                </section>
            </aside>
        </div>
    )
}