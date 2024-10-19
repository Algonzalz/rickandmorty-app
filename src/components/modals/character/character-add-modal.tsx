import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';


import { toast } from '@/hooks/use-toast';
import { useCharacterStore } from '@/lib/stores/character.store';
import { CharacterSchema } from '@/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



interface IProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}

export const CharacterAddModal: FC<IProps> = ({ isOpen, setIsOpen }) => {

    const addCharacter = useCharacterStore(state => state.addCharacter)

    const form = useForm<z.infer<typeof CharacterSchema>>({
        mode: "onChange",
        resolver: zodResolver(CharacterSchema),
        defaultValues: {
            name: '',
            gender: '',
            type: '',
            species: '',
        },
    })

    const handleDisable = () => {
        form.reset();
        setIsOpen(false)
    };
    const onSubmit = async (values: z.infer<typeof CharacterSchema>) => {
        // console.log(values);
        addCharacter(values)
        toast({
            title: "Exitoso",
            variant: 'normal',
            description: "Personaje Agregado",
        });
        setIsOpen(false);
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
                        <DialogTitle className='text-emerald-800'>Agregar Episodio</DialogTitle>
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <Button className='w-52 bg-slate-700' type="button" onClick={handleDisable}>
                            Cerrar
                        </Button>
                        <Button className='w-52' variant={'rickandmorty'} onClick={form.handleSubmit(onSubmit)}>
                            Agregar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
