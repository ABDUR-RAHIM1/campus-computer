import DataNotFound from '@/components/DataNotFound';
import ProfileDetails from '@/components/jobProfileDetails/jobProfileDetails';
import { getOneJobProfileByStudent } from '@/handlers/profile';
import React from 'react'

//  student profile
export default async function JobProfileDetails({ params }) {
    const { jpId } = await params;
    const { status, data } = await getOneJobProfileByStudent(jpId);

    if (status !== 200 || !data) {
        return <DataNotFound />;
    };
    return <ProfileDetails data={data} />
}
