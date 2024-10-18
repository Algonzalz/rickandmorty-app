import { Inter } from "next/font/google";
import Head from "next/head";
import LoginPage from "./login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`${inter.className}`}
		>
			<Head>
                <title>RickAndMortyAPP</title>
                <link rel="icon" href="/mortyAvatar.png" />
            </Head>
		<LoginPage/>
			{/* <h1 className="text-3xl font-bold tracking-tight"> Login del sistema</h1>
			

			<Button 
			variant="default"
			onClick={redirectTo}
			>Button</Button> */}

		</main>
	);
}
