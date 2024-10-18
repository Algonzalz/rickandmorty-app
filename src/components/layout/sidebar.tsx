import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebarToggle } from "@/lib/stores/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";

export function Sidebar() {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                sidebar?.isOpen === false ? "w-[90px]" : "w-56"
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="h-full flex flex-col py-4 shadow-md">
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1 bg-emerald-100 mr-3",
                        sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                >
                    <Link href="#" className="flex items-center gap-2">
                        <PanelsTopLeft  className="w- h-6 mr-1" />
                        <h1
                            className={cn(
                                "font-bold text-lg text-red whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                                sidebar?.isOpen === false
                                    ? "-translate-x-96 opacity-0 hidden"
                                    : "translate-x-0 opacity-100"
                            )}
                        >
                            RickAndMorty
                        </h1>
                    </Link>
                </Button>
                <Menu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    );
}
