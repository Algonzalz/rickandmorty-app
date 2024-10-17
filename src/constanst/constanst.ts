import { SideNavItem } from "@/lib/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Dashboard',
        path: '/home',
        icon: "lucide:layout-dashboard",
    },
    {
        title: 'Clientes',
        path: '/clients',
        icon: "lucide:users",
        // submenu: true,
        // subMenuItems: [
        // 	{ title: 'All', path: '/home' },
        // 	{ title: 'Web Design', path: '/projects/web-design' },
        // 	{ title: 'Graphic Design', path: '/projects/graphic-design' },
        // ],
    },
    {
        title: 'Reportes',
        path: '/reports',
        icon: "lucide:folders",
        submenu: true,
        subMenuItems: [
            { title: 'Elementos por conciliar', path: '/reports' },
            { title: 'Reporte 2', path: '' },
            { title: 'Reporte 3', path: '' },
            { title: 'Reporte 4', path: '' },
        ],
    },
    // {
    // 	title: 'Messages',
    // 	path: '/messages',
    // 	icon: "lucide:mail",
    // },
    // {
    // 	title: 'Settings',
    // 	path: '/settings',
    // 	icon: "lucide:settings",
    // 	submenu: true,
    // 	subMenuItems: [
    // 		{ title: 'Account', path: '/settings/account' },
    // 		{ title: 'Privacy', path: '/settings/privacy' },
    // 	],
    // },
    // {
    // 	title: 'Help',
    // 	path: '/help',
    // 	icon: "lucide:help-circle",
    // },
];