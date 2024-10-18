import Image from 'next/image';
import UserNav from './user-nav';

interface NavbarProps {
    title: string;
}

export function Navbar({ title = "RickANdMorty" }: NavbarProps) {
    return (
        <header className="sticky top-0 z-10 w-full shadow backdrop-blur supports-[backdrop-filter]:bg-slate-600">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    {
                        <Image src="/rickandmortylogo.png"
                            width={80} height={100} alt='rick'></Image>

                    }
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
