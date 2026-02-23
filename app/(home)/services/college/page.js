import ServicesClient from '@/app/(profile)/profile/components/ServicesClient';
import DataNotFound from '@/components/DataNotFound';
import ServicesInfo from '@/components/ServicesInfo';
import { fetchAllAdmissionServices } from '@/handlers/Admissions';
import { getAllServices } from '@/handlers/services'
import React from 'react'

export default async function CollageServices() {
    const [servicesRes, admissionRes] = await Promise.all([
        getAllServices(),
        fetchAllAdmissionServices().catch(() => ({ status: 500, data: [] }))
    ]);

    const { status, data } = servicesRes;
    const { status: admissionStatus, data: admissionData } = admissionRes;

    if (status !== 200 || !data) {
        return <DataNotFound text="Services not available for you at the moment!" />;
    }

    const safeAdmissionData = (admissionStatus === 200 && admissionData) ? admissionData : [];
    return (
        <div className=' px-5 md:px-12 my-10 min-h-screen'>

            <ServicesInfo />

            <ServicesClient
                data={data}
                admissionData={safeAdmissionData}
                colsStyle={"grid-cols-1 md:grid-cols-3"}
            />
        </div>
    )
}
