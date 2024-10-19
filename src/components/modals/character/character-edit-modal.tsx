import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

import { CharacterSchema } from '@/schema';
import { toast } from '@/hooks/use-toast';
import { ICharacter } from '@/lib/types';
import { useCharacterStore } from '@/lib/stores/character.store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



interface IProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    character: ICharacter
}

export const CharacterEditModal: FC<IProps> = ({ isOpen, setIsOpen, character }) => {

    const [disabled, setDisabled] = useState<boolean>(true)
    const updateCharacter = useCharacterStore(state => state.updateCharacter)

    const form = useForm<z.infer<typeof CharacterSchema>>({
        mode: "onChange",
        resolver: zodResolver(CharacterSchema),
        defaultValues: {
            name: character.name,
            gender: character.gender,
            type: character.type,
            species: character.species,
        },
    })

    const handleClose = () => {
        form.reset();
        setDisabled(true);
        setIsOpen(false);
    };
    const handleDisable = () => {
        setDisabled(false);
    };
    const onSubmit = async (values: z.infer<typeof CharacterSchema>) => {


        updateCharacter(character.id, values);
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
                        <DialogTitle className='text-emerald-800'>Detalle del Personaje</DialogTitle>
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
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre del Personaje</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={disabled}
                                                        maxLength={20} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Género</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione un Género" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Female">Mujer</SelectItem>
                                                        <SelectItem value="Male">Hombre</SelectItem>
                                                        <SelectItem value="unknown">Desconocido</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="species"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Especie</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione un Tipo" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Human">Humano</SelectItem>
                                                        <SelectItem value="Alien">Alien</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tipo de Personaje</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={disabled}
                                                        maxLength={20} {...field} />
                                                </FormControl>
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
                        {disabled ? (
                            <Button className='w-52' variant={'rickandmorty'} type="button" onClick={handleDisable}>
                                Editar
                            </Button>

                        ) : (
                            <Button className='w-52' variant={'rickandmorty'} onClick={form.handleSubmit(onSubmit)}>
                                Guardar
                            </Button>
                        )

                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
