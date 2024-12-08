import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDashboard, faPeopleGroup, faSliders, faUser, faUsers, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { Key } from "swr";

interface sidebarSubMenu {
    title: string,
    route: string
}

interface sidebarMenu {
    title: string,
    icon: IconProp,
    access: Array<"admin" | "participant" | "operator">,
    route: string,
    children?: sidebarSubMenu[]
}

interface sidebarItem {
    access: Array<"admin" | "participant" | "operator">,
    title: string,
    children: sidebarMenu[]
}

export const SidebarItems: sidebarItem[] =
    [
        {
            title: "Dashboard",
            access: ["admin", "operator"],
            children: [
                {
                    icon: faDashboard,
                    route: "/admin",
                    title: "Dashboard",
                    access: ["admin", "operator"],
                }
            ]
        },
        {
            title: "Menu Lainnya",
            access: ["admin", "operator"],
            children: [
                {
                    icon: faSliders,
                    route: "/admin/categories",
                    title: "Kategori",
                    access: ["admin", "operator"],
                },
                {
                    icon: faUsers,
                    route: "/admin/users",
                    title: "Users",
                    access: ["admin"]
                },
                {
                    icon: faPeopleGroup,
                    route: "#",
                    title: "Manajemen Tim",
                    access: ["admin", "operator"],
                    children: [
                        {
                            route: "/admin/teams/all",
                            title: "Semua Tim"
                        },
                        {
                            route: "/admin/teams/proposal",
                            title: "Proposal Tim"
                        },
                        {
                            route: "/admin/teams/submission",
                            title: "Pengajuan"
                        },
                    ]
                },
            ]
        },
        {
            title: "Dashboard Peserta",
            access: ["participant"],
            children: [
                {
                    icon: faDashboard,
                    route: "/participant",
                    title: "Dashboard",
                    access: ["participant"]
                }
            ]
        },
        {
            title: "Menu Lainnya",
            access: ["participant"],
            children: [
                {
                    icon: faUsersCog,
                    route: "/participant/team",
                    title: "Team",
                    access: ["participant"]
                }
            ]
        }
    ]