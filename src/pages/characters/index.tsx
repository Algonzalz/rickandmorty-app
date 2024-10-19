import { ReactElement, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { columnCharacter } from '@/components/columns/columnCharacter'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { ICharacter, ITransaction } from '@/lib/types'
import { CharacterAddModal } from '@/components/modals'
import { Button } from '@/components/ui/button'
import { UserRound } from 'lucide-react'
import { useCharacterStore } from '@/lib/stores/character.store'

const CharacterPage = () => {
	const [open, setIsOpen] = useState<boolean>(false);

	const [characters, setCharacters] = useState<ICharacter[]>([]);
	const setCharactersStore = useCharacterStore(state => state.setCharactersStore);
	const charactersStore = useCharacterStore(state => state.characters);
	useEffect(() => {
		async function getCharacters() {

			const response = await fetch('https://rickandmortyapi.com/api/character');
			const data: ITransaction = await response.json();
			setCharacters(data.results);
			setCharactersStore(data.results)
		};
		charactersStore.length != 0 ? setCharacters(charactersStore) : getCharacters();
	}, [charactersStore])

	const openModalAddCharacter = () => {
		setIsOpen(true);
	}

	return (

		<>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl text-emerald-500'>Personajes</CardTitle>
					<CardDescription>Personajes de Rick and Morty</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex justify-end'>

						<Button
							variant={'rickandmorty'}
							onClick={openModalAddCharacter}
							className='mb-2'
						>
							<UserRound  />
							Agregar Personaje</Button>

					</div>
					<DataTable columns={columnCharacter} data={characters} ></DataTable>
				</CardContent>
			</Card>

			<CharacterAddModal isOpen={open} setIsOpen={setIsOpen}></CharacterAddModal>
		</>
	)
}


CharacterPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<AdminPanelLayout>
			{page}
		</AdminPanelLayout>
	)
}

export default CharacterPage