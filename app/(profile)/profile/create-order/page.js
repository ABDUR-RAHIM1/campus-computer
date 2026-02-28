import React from 'react'
import SelectedSection from './SelectedSection'
import PaymentProccess from './PaymentProccess'

export default function CreateOrder() {
    return (
        <div className='my-10 px-3 md:px-5'>
            <div className='mb-8 text-center'>
                <h2 className="text-xl md:text-3xl font-bold text-slate-800">অর্ডার কনফার্ম করুন</h2>
                <p className='text-gray-500 text-sm mt-1'>আপনার নির্বাচিত সার্ভিসটি নিচে রিভিউ করুন এবং পেমেন্ট সম্পন্ন করুন</p>
            </div>

            <div className=' flex items-start gap-4 justify-between flex-wrap'>
                <div className=' selectionSection p-3 w-full md:w-[53%] border'>
                    <SelectedSection />
                </div>
                <div className=' applySection w-full md:w-[44%]'>
                    <PaymentProccess />
                </div>
            </div>
        </div>
    )
}
