
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ArrowLeftRight, Ellipsis, UserRoundPen } from "lucide-react"

import { CharacterChangeStatusModal, CharacterEditModal } from "../modals"
import { ICharacter } from "@/lib/types"


const CellComponent = ({ row }: { row: any }) => {
    const [open, setIsOpen] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)

    const openModalchangeStatusModal= () => {
        setIsOpen(true);
    }

    const openModalEdit = () => {
        setIsOpenModalEdit(true);
    }
    return (

        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0">

                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>

                                    <Ellipsis />
                                </TooltipTrigger>
                                <TooltipContent className="font-normal">
                                    <p>Detalle Por Plataformas</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={openModalEdit}>
                        <UserRoundPen className="w-4 h-4 mr-3 text-muted-foreground" />Editar Personaje
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={openModalchangeStatusModal}>
                        <ArrowLeftRight  className="w-4 h-4 mr-3 text-muted-foreground" />Cambiar Estado Personaje</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <CharacterChangeStatusModal isOpen={open} setIsOpen={setIsOpen} character={row.original} ></CharacterChangeStatusModal>
            <CharacterEditModal isOpen={isOpenModalEdit} setIsOpen={setIsOpenModalEdit} character={row.original} ></CharacterEditModal>
        </>

    )
}
export const columnCharacter: ColumnDef<ICharacter>[] = [
    {
        accessorKey: "species",
        header: "Especie",
    },
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {
            const valueType = row.getValue("type");

            return valueType ? valueType : '-';
        },
    },
    {
        accessorKey: "gender",
        header: "Género",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "status",
        header: "Estado",
    },
    {
        id: "actions",
        header: 'Opciones',
        cell: CellComponent
    },
]