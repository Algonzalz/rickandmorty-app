import { Navbar } from "./navbar";

interface ContentLayoutProps {
    children: React.ReactNode;
}

export function ContentLayout({children }: ContentLayoutProps) {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4 h-[calc(100vh-56px)] overflow-auto">{children}</div>
        </div>
    );
}
