import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

import { SideNavItem } from '@/lib/types/types';
import { SIDENAV_ITEMS } from '@/constanst/constanst';

const SideNav = () => {
    return (
        <div className="md:w-52 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
            <div className="flex flex-col space-y-6 w-full">
                <Link
                    href="/home"
                    className="flex flex-row space-x-3 items-center justify-center md:justify-center border-b border-daycohost_primary h-14 w-full bg-daycohost_primary"
                >

                    {
                        //<span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                        <Image src="/logo-daycohost-fondos-con-color.png"
                            width={100} height={100} alt='daycohost'></Image>
                            // <img src="./logo-daycohost-fondos-con-color.png" alt="daycohostLogo" />

                        //<span className="font-bold text-xl hidden md:flex">Logo</span>

                    }

                </Link>

                <div className="flex flex-col space-y-2 md:px-6 ">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <MenuItem key={idx} item={item} />;
                    })}
                </div>
                <div className='absolute w-full bottom-0 h-16 flex flex-col space-y-2 md:px-6'>
                    {/* <SheetLeft  isOpen={}/> */}
                </div>

            </div>
        </div>
    );
}

export default SideNav

const MenuItem = ({ item }: { item: SideNavItem }) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };


    return (
        <div>
            {item.submenu ? (
                <>
                    <button
                        onClick={toggleSubMenu}
                        className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 hover:text-daycohost_primary  ${pathname.includes(item.path) ? 'bg-daycohost_primary-100 text-daycohost_primary' : ''
                            }`}
                    >
                        <div className="flex flex-row space-x-4 items-center">

                            <Icon icon={item.icon || ''} width="24" height="24" />
                            <span className="font-semibold text-sm flex">{item.title}</span>
                        </div>

                        <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
                            <Icon icon="lucide:chevron-down" width="24" height="24" />
                        </div>
                    </button>

                    {subMenuOpen && (
                        <div className="my-2 ml-12 flex flex-col space-y-2">
                            {item.subMenuItems?.map((subItem, idx) => {
                                return (

                                    <Link
                                        key={idx}
                                        href={subItem.path}
                                        className={`${subItem.path === pathname ? 'font-bold text-daycohost_primary' : ''
                                            }`}
                                    >
                                        <span className='text-sm'>{subItem.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </>
            ) : (
                <Link
                    href={item.path}
                    className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100  hover:text-daycohost_primary ${item.path === pathname ? 'bg-daycohost_primary-100 text-daycohost_primary' : ''
                        }`}
                >
                    <Icon icon={item.icon || ''} width="24" height="24" />
                    <span className="font-semibold text-sm flex">{item.title}</span>
                </Link>
            )}
        </div>
    );
};
