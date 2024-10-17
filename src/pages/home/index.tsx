import { DashboardLayout } from '@/components/layout/DashboardLayout'
import React, { ReactElement } from 'react'

const DashboardPage = () => {
    return (
        <div>DashboardPage</div>
    )
}


DashboardPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<DashboardLayout>
			{page}
		</DashboardLayout>
	)
}

export default DashboardPage