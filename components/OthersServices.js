import { campusServices } from '@/LocalDatabase/campusComputer/campusItServices'
import Image from 'next/image'
import React from 'react'

export default function OthersServices() {
    return (
        <section id="services-list" className='py-16 bg-gradient-to-br from-blue-100 to-blue-200'>
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-extrabold text-center text-blue-900 mb-6 leading-tight">
                    আমাদের অন্যান্য সেবাসমূহ
                </h2>
                <p className=" text-center text-blue-700 mb-12 max-w-4xl mx-auto">
                    ক্যাম্পাস কম্পিউটার থেকে আপনি পাবেন বহুমুখী ডিজিটাল সেবা। প্রতিটি সেবাই নির্ভুলতা ও দ্রুততার সাথে প্রদান করা হয়।
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {campusServices.map((service) => (
                        <div
                            key={service.id}
                            className={`relative ${service.bgColor} rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-sm`}
                        >
                            <div className="p-5 flex flex-col items-center text-center">
                                {service.icon && (
                                    <div className="w-full my-2">
                                        <Image
                                            src={service.icon}
                                            alt={service.title}
                                            width={200}
                                            height={200}
                                            className="w-full h-[220px] rounded-md"
                                        />
                                    </div>
                                )}
                                <h3 className={`text-2xl font-bold ${service.textColor} mb-3`}>
                                    {service.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                            <div className={`absolute bottom-0 left-0 w-full h-2 ${service.textColor.replace('text', 'bg')}`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
