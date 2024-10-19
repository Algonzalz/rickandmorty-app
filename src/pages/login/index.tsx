import { createElement, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";
import { z } from "zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Box } from "@/components/box";

import { hasOnlyLettersAndDot } from "@/lib/common/common.validators";
import {  EyeIcon, EyeOffIcon, RefreshCcw } from "lucide-react";
import { login } from "@/api/mockAuth";
import { LoginSchema } from "@/schema";
import { useToast } from "@/components/ui/use-toast";
// import { hasOnlyLetters } from "@/lib/common/common.validators";


interface ILogin{
	username: string,
	password: string
}

const LoginPage = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    // const setToken = useTokenStore(state => state.setToken);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    
    const handleLogin = async ({ username, password }: ILogin ) => {
		setLoading(true);
		try {
			const isLoggedIn = await login(username, password);
			if(isLoggedIn){
                router.push('/characters');
			}else{
				toast({
					variant: "destructive",
					title: "Error",
					description: "Usuario o contraseña Incorrecta",
				  })
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: `${error} al realizar la solicitud`,
			  })
		} finally{
			setLoading(false);
		}
	}

    // 1. Define your form.
    const form = useForm<z.infer<typeof LoginSchema>>({
        mode: "onChange",
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        handleLogin(values);
        form.reset();
    }

    //para validar con el onkeyDown en el input y no deja colocar letras o numeros
    // const handleKeyDown = hasOnlyLetters;

    return (
        <div className="grid w-full min-h-screen lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center px-4 py-12 bg-background sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:block">
                        <div className="sm:block lg:hidden">
                            <Image
                                src="/rickandmortylogo.png"
                                alt="Login image"
                                width="1200"
                                height="800"
                                className="h-full w-full"
                                style={{ aspectRatio: "1200/800", objectFit: "scale-down" }}
                            />


                        </div>
                        <h1 className="mt-6 text-4xl text-center font-bold tracking-tight text-emerald-900">Rick and Morty</h1>
                        <h1 className="text-4xl text-center font-bold tracking-tight text-emerald-900">APP</h1>


                    </div>
                    <div>
                        <h2 className="mt-6 text-2xl font-bold tracking-tight text-emerald-900">Ingrese con su cuenta</h2>
                        {/* <p className="mt-2 text-sm text-muted-foreground">
                            Ingrese con sus credenciales
                        </p> */}
                    </div>
                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Usuario</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingrese su usuario"
                                                onKeyDown={hasOnlyLettersAndDot}
                                                maxLength={20} {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Box className="relative">
                                                <Input
                                                    type={passwordVisibility ? "text" : "password"}
                                                    placeholder="Ingrese su contraseña"
                                                    maxLength={12} {...field} />
                                                <Box
                                                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                                >
                                                    {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                                                        className: "h-6 w-6",
                                                    })}
                                                </Box>
                                            </Box>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit"
                                className="w-full"
                                variant={"rickandmorty"}
                                disabled={!form.formState.isValid || loading}>
                                {loading && <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Cargando...' : 'Iniciar Sesión'}

                            </Button>
                        </form>


                    </Form>

                    {/* <div className="flex items-center justify-between"> */}
                    {/* <div className="flex items-center">
                                <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 text-primary focus:ring-primary" />
                                <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                                    Remember me
                                </Label>
                            </div> */}
                    {/* </div> */}
                </div>
            </div>
            <div className="hidden lg:block bg-gradient-to-b from-[#213545] to-emerald-300">
                <Image
                    src="/rickandmortyfont.png"
                    alt="client"
                    width="800"
                    height="800"
                    className="h-full w-1/2 object-cover fixed grayscale opacity-15"
                />
                <Image
                    src="/rickandmortylogo.png"
                    alt="Login image"
                    width="500"
                    height="800"
                    className="h-full w-full"
                    style={{ aspectRatio: "00/800", objectFit: "scale-down" }}
                />
            </div>
        </div>

    )
}

export default LoginPage