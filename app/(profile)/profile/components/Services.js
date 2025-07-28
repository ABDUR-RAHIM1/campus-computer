import DataNotFound from '@/components/DataNotFound';
import { getAllServices } from '@/handlers/services';
import React from 'react';
import ServicesCard from '@/components/services/ServicesCard';

export default async function Services() {
    const { status, data } = await getAllServices();

    if (status !== 200 || !data?.length) {
        return <DataNotFound text="Services not available for you" />;
    }

    return (
        <div >
            <ServicesCard data={data} />
        </div>
    );
}

