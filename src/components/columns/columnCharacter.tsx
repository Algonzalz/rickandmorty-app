import { IResult } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ArrowLeftRight, Compass, Ellipsis, Search, UserRoundPen } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }



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
            {/* <ElementDetailModal isOpen={openn} setIsOpen={setIsOpen}></ElementDetailModal>
            <LogElementModal isOpen={isOpenModalLog} setIsOpenModalLog={setIsOpenModalLog}></LogElementModal> */}
            {/* LogElementModal */}
        </>

    )
}
export const columnCharacter: ColumnDef<IResult>[] = [
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
        id: "actions",
        header: 'Opciones',
        cell: CellComponent
    },
]