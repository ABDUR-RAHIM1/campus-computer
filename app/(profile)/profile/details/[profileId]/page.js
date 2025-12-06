 
import React from 'react'; 
import { getStudentProfileById } from '@/handlers/profile';
import ProfileDetails from '@/components/profileDetails/ProfileDetails';

export default async function Details({ params }) {
    const { profileId } = await params
    const { status, data } = await getStudentProfileById(profileId);

    return <ProfileDetails status={status} data={data} />
}
