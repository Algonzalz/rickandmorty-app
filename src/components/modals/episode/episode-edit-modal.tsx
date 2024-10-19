import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

import { IEpisode } from '@/lib/types/episodes';
import { EpisodeDetailSchema } from '@/schema';
import { useEpisodeStore } from '@/lib/stores/episode.store';
import { useToast } from '@/components/ui/use-toast';



interface IProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    episode: IEpisode
}

export const EpisodeEditModal: FC<IProps> = ({ isOpen, setIsOpen, episode }) => {

    const [disabled, setDisabled] = useState<boolean>(true)
    const  updateEpisode = useEpisodeStore(state => state.updateEpisode)
    const { toast } = useToast()
    
    const form = useForm<z.infer<typeof EpisodeDetailSchema>>({
        mode: "onChange",
        resolver: zodResolver(EpisodeDetailSchema),
        defaultValues: {
            name: episode.name,
            episode: episode.episode
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
    const onSubmit = async (values: z.infer<typeof EpisodeDetailSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // handleLogin(values);
        updateEpisode(episode.id, values);
        toast({
            title: "Exitoso",
            variant: 'normal',
            description: "Episodio Actualizado",
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
                        <DialogTitle className='text-emerald-800'>Detalle del Episodio</DialogTitle>
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
                                                        disabled={disabled}
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
