import Head from "next/head"
import MarginWrapper from "./MarginWrapper"
import PageWrapper from "./PageWrapper"
import SideNav from "../side-nav"
import HeaderPage from "../header"
import HeaderMobilePage from "../header-mobile"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (

        <>
            <Head>
                <title>DaycohosWeb</title>
                {/* <link rel="icon" href="/logo-daycohost-fondos-blancos.png" /> */}
            </Head>

            <div className="flex">

                <SideNav />
                <main className="flex-1">

                    <MarginWrapper>
                        <HeaderPage />
                        <HeaderMobilePage />
                        <PageWrapper>
                            {children}

                        </PageWrapper>

                    </MarginWrapper>

                </main>

            </div>
        </>
    )
}
