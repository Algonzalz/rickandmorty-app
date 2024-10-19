
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ArrowLeftRight, Ellipsis, UserRoundPen } from "lucide-react"
import { ICharacter } from "@/lib/types"


const CellComponent = ({ row }: { row: any }) => {
    // const [openn, setIsOpen] = useState(false)
    // const [isOpenModalLog, setIsOpenModalLog] = useState(false)

    // const openModalElementDetail = () => {
    //     setIsOpen(true);
    // }

    // const openModalLog = () => {
    //     setIsOpenModalLog(true);
    // }
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
                    <DropdownMenuItem>
                        <UserRoundPen className="w-4 h-4 mr-3 text-muted-foreground" />Editar Personaje
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ArrowLeftRight  className="w-4 h-4 mr-3 text-muted-foreground" />Cambiar Estado Personaje</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
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