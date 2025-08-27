import React from 'react';
import StudentListTable from './JobProfileTable';
import DataNotFound from '@/components/DataNotFound';
import { getAllJobProfileByAdmin } from '@/handlers/profile';

// studentprofile and account
export default async function JobProfileList() {


    const { status, data } = await getAllJobProfileByAdmin();
 


    if (status !== 200 || !data) return <DataNotFound text={data?.message} />


    return <StudentListTable data={data} />;
}
