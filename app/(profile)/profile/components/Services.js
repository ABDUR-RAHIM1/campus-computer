import DataNotFound from '@/components/DataNotFound';
import { getAllServices } from '@/handlers/services';
import React from 'react';
import ServicesClient from './ServicesClient';

export default async function Services() {
    const { status, data } = await getAllServices();

    if (status !== 200 || !data?.length) {
        return <DataNotFound text="Services not available for you" />;
    }

    return <ServicesClient
        data={data}
        colsStyle={"grid-cols-1 md:grid-cols-2"}
    />

}

