
import Head from "next/head"
import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/lib/stores/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "./sidebar";
import { ContentLayout } from "./content-layout";

export default function AdminPanelLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;



    return (
        <>
            <Head>
                <title>RickAndMortyAPP</title>
                <link rel="icon" href="/mortyAvatar.png" />
            </Head>

            <Sidebar />
            <main
                className={cn(
                    "h-[calc(100vh-60px)] bg-white transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-56"
                )}
            >


                <ContentLayout>

                    {children}
                </ContentLayout>
            </main>
        </>
    );
}
