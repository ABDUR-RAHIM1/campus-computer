import React from 'react';
import StudentListTable from './StudentListTable'; 
import DataNotFound from '@/components/DataNotFound';
import { getStudentProfileByAdmin } from '@/handlers/profile';

// studentprofile and account
export default async function StudentList() {


    const { status, data } = await getStudentProfileByAdmin();
 

    if (status !== 200 || !data) return <DataNotFound text={data?.message} />


    return <StudentListTable data={data} />;
}
