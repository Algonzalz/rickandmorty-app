import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import React, { ReactElement } from 'react'

const CharacterPage = () => {
    return (
        <div>CharacterPage</div>
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