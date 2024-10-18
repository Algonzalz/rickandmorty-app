import { ReactElement, useEffect, useState } from 'react'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { columnEpisodes } from '@/components/columns'
import { IResultEpisodes, ITransactionEpisode } from '@/lib/types/episodes'

const EpisodesPages = () => {
	const [episodes, setEpisodes] = useState<IResultEpisodes[]>([])
	useEffect(() => {
		async function getCharacters() {

			const response = await fetch('https://rickandmortyapi.com/api/episode');
			const data: ITransactionEpisode = await response.json();
			setEpisodes(data.results);
		}
		getCharacters()
	}, [])



	return (

		<>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl text-emerald-500'>Episodios</CardTitle>
					<CardDescription>Episodios de Rick and Morty</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columnEpisodes} data={episodes} ></DataTable>
				</CardContent>
			</Card>
		</>
	)
}
EpisodesPages.getLayout = function getLayout(page: ReactElement) {
	return (
		<AdminPanelLayout>
			{page}
		</AdminPanelLayout>
	)
}

export default EpisodesPages