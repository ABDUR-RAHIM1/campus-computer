import DataNotFound from '@/components/DataNotFound';
import { getAllServices } from '@/handlers/services';
import React from 'react';
import ServicesClient from './ServicesClient';
import { fetchAllAdmissionServices } from '@/handlers/Admissions';

export default async function Services() {
    
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
        <ServicesClient
            data={data}
            admissionData={safeAdmissionData}
            colsStyle={"grid-cols-1 md:grid-cols-2"}
        />
    );
}