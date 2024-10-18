import { ReactElement, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { columnCharacter } from '@/components/columns/columnCharacter'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import { IResult, ITransaction } from '@/lib/types'

const CharacterPage = () => {

	const [characters, setCharacters] = useState<IResult[]>([])
	useEffect(() => {
		async function getCharacters(){

			const response = await fetch('https://rickandmortyapi.com/api/character');
			const data: ITransaction = await response.json();
			setCharacters(data.results);
		}
		getCharacters()
	}, [])



	return (

		<>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl text-emerald-500'>Personajes</CardTitle>
					<CardDescription>Personajes de Rick and Morty</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columnCharacter} data={characters} ></DataTable>
				</CardContent>
			</Card>
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