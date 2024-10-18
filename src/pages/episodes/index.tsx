import { ReactElement } from 'react'
import AdminPanelLayout from '@/components/layout/admin-panel-layout'

const EpisodesPages = () => {
  return (
    <div>EpisodesPages</div>
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