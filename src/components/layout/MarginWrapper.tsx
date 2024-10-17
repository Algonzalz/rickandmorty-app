import { ReactNode } from "react";


export default function MarginWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col md:ml-52 sm:border-r sm:border-zinc-700 min-h-screen">
            {children}
        </div>
    );
}
