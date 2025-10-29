import React from 'react'
import SelectedSection from './SelectedSection'
import PaymentProccess from './PaymentProccess'

export default function CreateOrder() {
    return (
        <div className='my-10 px-3 md:px-5'>
            <h2 className="my-4 text-lg md:text-3xl font-medium text-red-500 text-center">
                অনুগ্রহ করে পেজ রিফ্রেশ করবেন না </h2>  

            <div className=' flex items-start gap-4 justify-between flex-wrap'>
                <div className=' selectionSection p-3 w-full md:w-[53%] border'>
                    <SelectedSection />
                </div>
                <div className=' applySection p-1 w-full md:w-[44%] border'>
                    <PaymentProccess />
                </div>
            </div>
        </div>
    )
}
