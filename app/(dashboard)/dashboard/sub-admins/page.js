import React from 'react'
import SubAdminForm from './AddSubAdmin'
import SubAdminsList from './SubAdminsList' 
import DataNotFound from '@/components/DataNotFound';
import { getAllSubAdmins } from '@/handlers/subAdmins';

export default async function SubAdmins() {

    const { status, data } = await getAllSubAdmins()



    return (
        <div className='my-10'>
            <SubAdminForm />
            {
                status !== 200 | !data ?
                    <DataNotFound /> 
                    :
                    <SubAdminsList data={data} />

            }
        </div>
    )
}
