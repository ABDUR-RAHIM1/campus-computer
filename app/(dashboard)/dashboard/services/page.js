import DataNotFound from '@/components/DataNotFound';
import { getAllServices } from '@/handlers/services'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ServicesTable from './ServicesTable';


//  admin dahsboard
export default async function Services() {

    const { status, data } = await getAllServices();
 
    if (status !== 200 || !data) <DataNotFound text={data?.message} />;



    return (
        <div className=' px-5 w-full min-h-screen'>
            <div className=' sticky top-[100px] z-[100] inline-block my-5 mr-0'>
                <Link
                    href={"/dashboard/services/add"}
                    className='  flex items-center gap-2 font-semibold py-2 px-4 bg-blue-500 text-white rounded-md shadow-md transition-all hover:bg-blue-600 '
                >সার্ভিস যুক্ত করুন
                    <Plus />
                </Link>
            </div>


            {/*  Services Table */}
            <ServicesTable data={data} />

        </div>
    )
}
