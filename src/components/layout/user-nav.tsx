import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LogOut} from "lucide-react"

import { useEpisodeStore } from "@/lib/stores/episode.store"
import { useCharacterStore } from "@/lib/stores/character.store"


const userNav = () => {

    const clearEpisode = useEpisodeStore(state => state.clearEpisode)
    const clearCharacters = useCharacterStore(state => state.clearCharacters)
    const router = useRouter();

	const redirectToHome = () => {
        clearEpisode();
        clearCharacters();
		router.push('/')
	}
    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/mortyAvatar.png" alt="Avatar" />
                                    <AvatarFallback className="bg-transparent">RM</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent  side="left">Usuario</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">RickAndMorty</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            rickandMorty@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer" onClick={redirectToHome}>
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                    Cerrar Sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default userNav