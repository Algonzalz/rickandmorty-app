import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';


import { EpisodeDetailSchema } from '@/schema';
import { useEpisodeStore } from '@/lib/stores/episode.store';
import { toast } from '@/hooks/use-toast';



interface IProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}

export const EpisodeAddModal: FC<IProps> = ({ isOpen, setIsOpen }) => {

    const addEpisode = useEpisodeStore(state => state.addEpisode)

    const form = useForm<z.infer<typeof EpisodeDetailSchema>>({
        mode: "onChange",
        resolver: zodResolver(EpisodeDetailSchema),
        defaultValues: {
            name: '',
            episode: ''
        },
    })

    const handleDisable = () => {
        form.reset();
        setIsOpen(false)
    };
    const onSubmit = async (values: z.infer<typeof EpisodeDetailSchema>) => {
        addEpisode(values)
        toast({
            title: "Exitoso",
            variant: 'normal',
            description: "Episodio Agregado",
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
                                                <FormLabel>Nombre del Episodio</FormLabel>
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
                                        name="episode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Episodio</FormLabel>
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
