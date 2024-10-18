import { SideNavItem } from "@/lib/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [

    {
        title: 'Personajes',
        path: '/characters',
        icon: "lucide:users",
    },
    {
        title: 'Episodios',
        path: '/episodes',
        icon: "lucide:clapperboard",
    }
];



type Menu = {
    href: string;
    label: string;
    icon: string
};


export const MENULIST: Menu[] = [
    {
        href: "/characters",
        label: "Personajes",
        icon: "lucide:users"

    },
    {
        href: "/episodes",
        label: "Episodios",
        icon: "lucide:clapperboard"
    }
]