import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBaby, faDashboard, faPeopleGroup, faSliders, faUser, faUsers, faUsersCog } from "@fortawesome/free-solid-svg-icons";

interface sidebarSubMenu {
    title: string,
    route: string
}

interface sidebarMenu {
    title: string,
    icon: IconProp,
    route: string,
    children?: sidebarSubMenu[]
}

interface sidebarItem {
    access: "admin" | "participant" | "juri",
    title: string,
    children: sidebarMenu[]
}

export const SidebarItems: sidebarItem[] =
    [
        {
            title: "Dashboard Admin",
            access: "admin",
            children: [
                {
                    icon: faDashboard,
                    route: "/admin",
                    title: "Dashboard"
                }
            ]
        },
        {
            title: "Menu Lainnya",
            access: "admin",
            children: [
                {
                    icon: faSliders,
                    route: "/admin/categories",
                    title: "Kategori"
                },
                {
                    icon: faUsers,
                    route: "/admin/users",
                    title: "Users"
                },
                {
                    icon: faPeopleGroup,
                    route: "#",
                    title: "Manajemen Tim",
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
            access: "participant",
            children: [
                {
                    icon: faDashboard,
                    route: "/participant",
                    title: "Dashboard"
                }
            ]
        },
        {
            title: "Menu Lainnya",
            access: "participant",
            children: [
                {
                    icon: faUsersCog,
                    route: "/participant/team",
                    title: "Team"
                }
            ]
        }
    ]