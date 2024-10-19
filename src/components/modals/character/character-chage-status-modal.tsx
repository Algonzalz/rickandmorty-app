import { Dispatch, FC, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CharacterStatusSchema } from '@/schema';
import { toast } from '@/hooks/use-toast';
import { useCharacterStore } from '@/lib/stores/character.store';
import { ICharacter } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



interface IProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    character: ICharacter
}

export const CharacterChangeStatusModal: FC<IProps> = ({ isOpen, setIsOpen, character }) => {

    const updateCharacterStatus = useCharacterStore(state => state.updateCharacterStatus)

    const form = useForm<z.infer<typeof CharacterStatusSchema>>({
        mode: "onChange",
        resolver: zodResolver(CharacterStatusSchema),
        defaultValues: {
            status: character.status,
        },
    })

    const handleClose = () => {
        form.reset();
        setIsOpen(false);
    };
    const onSubmit = async (values: z.infer<typeof CharacterStatusSchema>) => {
        updateCharacterStatus(character.id, values.status);
        toast({
            title: "Exitoso",
            variant: 'normal',
            description: "Personaje Actualizado",
        })
        handleClose();
    }
    return (
        <>
            <Dialog open={isOpen}>
                <DialogContent
                    onInteractOutside={(e) => { e.preventDefault(); }}
                    className="w-full max-w-full md:max-w-screen-md bg-secondary max-h-[90vh] p-6 rounded-lg flex flex-col"
                >
                    {/* Encabezado del diálogo */}
                    <DialogHeader>
                        <DialogTitle className='text-emerald-800'> Estado del Personaje</DialogTitle>
                        <DialogDescription>
                            {/* Descripción opcional aquí */}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto bg-white px-32 pb-3 pt-3 rounded-md">
                        {/* <ActiveService / */}
                        <div className='my-4'>
                            <Form {...form}>


                                <form className="space-y-8">

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Estado</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione un Estado" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Alive">Vivo</SelectItem>
                                                        <SelectItem value="Dead">Muerto</SelectItem>
                                                        <SelectItem value="unknown">Desconocido</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>


                            </Form>

                        </div>
                    </div>
                    {/* Cuerpo desplazable del diálogo */}

                    {/* Footer con el botón centrado */}
                    <DialogFooter className="flex flex-col-reverse items-center sm:flex-row sm:justify-center mt-4 space-x-0">
                        <Button className='w-52 bg-slate-700' type="button" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button className='w-52' variant={'rickandmorty'} onClick={form.handleSubmit(onSubmit)}>
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
