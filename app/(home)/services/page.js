import ServicesClient from '@/app/(profile)/profile/components/ServicesClient';
import DataNotFound from '@/components/DataNotFound';
import ServicesCard from '@/components/services/ServicesCard';
import ServicesInfo from '@/components/ServicesInfo';
import { getAllServices } from '@/handlers/services'
import React from 'react'

export default async function CollageServices() {
    const { status, data } = await getAllServices();

    if (status !== 200 || !data) {
        return <DataNotFound text={data?.message} />
    }

    return (
        <div className=' px-5 md:px-12 my-10 min-h-screen'>

            <ServicesInfo />

            <ServicesClient
                data={data}
                colsStyle={"grid-cols-1 md:grid-cols-3"}
            />
        </div>
    )
}
