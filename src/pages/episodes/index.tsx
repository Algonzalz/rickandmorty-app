import { ReactElement, useEffect, useState } from 'react'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { columnEpisodes } from '@/components/columns'
import { IEpisode, ITransactionEpisode } from '@/lib/types/episodes'
import { useEpisodeStore } from '@/lib/stores/episode.store'
import { Film } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EpisodeAddModal } from '@/components/modals/episode/episode-add-modal'

const EpisodesPages = () => {
	const [open, setIsOpen] = useState<boolean>(false);
	const [episodes, setEpisodes] = useState<IEpisode[]>([])
	const setEpisodesStore = useEpisodeStore(state => state.setEpisodesStore);
	const episodesStore = useEpisodeStore(state => state.episodes);


	useEffect(() => {
		async function getCharacters() {
			const response = await fetch('https://rickandmortyapi.com/api/episode');
			const data: ITransactionEpisode = await response.json();
			setEpisodes(data.results);
			setEpisodesStore(data.results);
		}
		if(episodesStore.length != 0){
			setEpisodes(episodesStore)
		}else{
			getCharacters();
		}
	}, [episodesStore])


	const openModalAddEpisode = () => {
        setIsOpen(true);
    }

	return (

		<>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl text-emerald-500'>Episodios</CardTitle>
					<CardDescription>Episodios de Rick and Morty</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex justify-end'>

						<Button
							variant={'rickandmorty'}
							onClick={openModalAddEpisode}
							className='mb-2'
						>
							<Film />
							Agregar Episodio</Button>

					</div>
					<DataTable columns={columnEpisodes} data={episodes} ></DataTable>

				</CardContent>
			</Card>
			<EpisodeAddModal isOpen={open} setIsOpen={setIsOpen}></EpisodeAddModal>

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