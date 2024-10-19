import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "@/components/ui/tooltip";

import { Icon } from "@iconify/react/dist/iconify.js";

import { cn } from "@/lib/utils";
import { MENULIST } from "@/constanst/constanst";

interface MenuProps {
    isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
    const pathname = usePathname();

    return (
        <nav className="mt-8 h-full w-full">
            <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
                {MENULIST.map((item, index) => (
                    <li className={cn("w-full")} key={index}>

                        <p className="pb-2"></p>

                        <div className="w-full" key={index}>
                            <TooltipProvider disableHoverableContent>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant={`${item.href === pathname ? 'rickandmorty' : 'ghost'}`}
                                            className="w-full justify-start h-10 mb-1"
                                            asChild
                                        >
                                            <Link href={item.href}>
                                                <span
                                                    className={cn(isOpen === false ? "" : "mr-4")}
                                                >
                                                    <Icon icon={item.icon || ''} width="32" height="32" />
                                                </span>
                                                <p
                                                    className={cn(
                                                        "max-w-[200px] truncate",
                                                        isOpen === false
                                                            ? "-translate-x-96 opacity-0"
                                                            : "translate-x-0 opacity-100"
                                                    )}
                                                >
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    {isOpen === false && (
                                        <TooltipContent side="right">
                                            {item.label}
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                    </li>
                ))}

            </ul>
        </nav >
    );
}
