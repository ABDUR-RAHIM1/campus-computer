import ProfileDetails from '@/components/profileDetails/ProfileDetails';
import { getStudentProfileByIdForAdmin } from '@/handlers/profile';
import React from 'react'

export default async function ProfileDeteilsAdmin({ params }) {
    const { profileId } = await params
    const { status, data } = await getStudentProfileByIdForAdmin(profileId);

    return <ProfileDetails status={status} data={data} />
}
