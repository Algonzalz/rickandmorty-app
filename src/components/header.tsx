import Link from "next/link"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import Image from 'next/image';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react/dist/iconify.js";
import useScroll from "@/hooks/use-scroll";

const HeaderPage = () => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();

	const router = useRouter();

	const redirectToHome = () => {
		router.push('/')
	}

	return (
		<div
			className={cn(
				`sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-daycohost_primary`,
				{
					'border-b border-gray-200 bg-daycohost_primary backdrop-blur-lg': scrolled,
					'border-b border-gray-200 bg-white': selectedLayout,
				},
			)}
		>
			<div className="flex h-14 items-center justify-between px-4">
				<div className="flex items-center space-x-4">
					<Link
						href="/"
						className="flex flex-row space-x-3 items-center justify-center md:hidden"
					>
						{/* <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
						<span className="font-bold text-xl flex ">Logo</span> */}

						{
							<Image src="/logo-daycohost-fondos-con-color.png"
								width={100} height={100} alt='daycohostLogo'></Image>
							// <Image src="./logo-daycohost-fondos-con-color.png" alt="daycohostLogo" />

						}
					</Link>
				</div>

				<h1 className="text-white text-xl font-bold">Modelo Único de Cliente</h1>
				<div className="block">
					<div className="flex gap-4">
						<div>
							<p className="text-white font-semibold text-center tracking-wider">Pedro Pérez</p>
							<p className="text-white text-muted-foreground text-xs text-center">Administrador</p>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
									{/* <span className="font-semibold text-sm">HQ</span> */}
									<Icon icon="lucide:circle-user-round" width="24" height="24"></Icon>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Pedro Pérez</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={redirectToHome} >Cerrar Sesión</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>



				</div>
			</div>
		</div>
	);
}

export default HeaderPage