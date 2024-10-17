export type SideNavItem = {
	title: string;
	path: string;
	icon?: string;
	submenu?: boolean;
	subMenuItems?: SideNavItem[];
};


export type MenuItemWithSubMenuProps = {
	item: SideNavItem,
	toggleOpen: () => void
}
