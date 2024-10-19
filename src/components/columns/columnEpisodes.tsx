import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Ellipsis, UserRoundPen } from "lucide-react"

import { EpisodeEditModal } from "../modals"
import { IEpisode } from "@/lib/types/episodes"

const CellComponent = ({ row }: { row: any }) => {
    const [open, setIsOpen] = useState<boolean>(false);


    const openModalEpisodeDetail = () => {
        setIsOpen(true);
    }

    return (

        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0">


                        <Ellipsis />

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={openModalEpisodeDetail}>
                        <UserRoundPen className="w-4 h-4 mr-3 text-muted-foreground" />Editar Episodio
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EpisodeEditModal isOpen={open} setIsOpen={setIsOpen} episode={row.original} ></EpisodeEditModal>
        </>

    )
}
export const columnEpisodes: ColumnDef<IEpisode>[] = [

    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Nombre del Episodio",
    },
    {
        accessorKey: "episode",
        header: "Episodio",
    },
    {
        id: "actions",
        header: 'Opciones',
        cell: CellComponent
    },
]