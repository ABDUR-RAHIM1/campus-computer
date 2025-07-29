import React from 'react';
import StudentListTable from './StudentListTable';
import { getAllProfileInfo } from '@/handlers/studentAuth';
import DataNotFound from '@/components/DataNotFound';

export default async function StudentList() {
     

    const { status, data } = await getAllProfileInfo();

    if (status !== 200 || !data) return <DataNotFound text={data?.message} />
 

    return <StudentListTable data={data} />;
}
