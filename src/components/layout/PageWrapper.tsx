import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4 h-[calc(100vh-60px)] overflow-auto">
			{/* <div className="w-full h-24 bg-[#6ebbcf] z-10 "> */}

				{children}

			{/* </div> */}
		</div>
	);
}
