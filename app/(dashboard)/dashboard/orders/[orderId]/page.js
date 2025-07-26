import DataNotFound from '@/components/DataNotFound'
import DocumentImage from '@/components/DocumentImage'
import { demoProfilePicture } from '@/constans'
import { GetOrderDetails } from '@/handlers/order'
import DownloadButton from '@/utilities/DownloadButton'
import Image from 'next/image'
import React from 'react' 

export default async function OrderDetails({ params }) {
    const { orderId } = await params
    const { status, data } = await GetOrderDetails(orderId)

    if (!data) return <DataNotFound text={data?.message} />

    const {  studentId, serviceId, paymentStatus, status: orderStatus, createdAt } = data

    return (
        <div className="max-w-4xl my-20 mx-auto bg-white p-6 mt-10 rounded-lg shadow-md border border-gray-200">
            <div className=' flex items-center justify-between flex-wrap'>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 অর্ডার ডিটেইলস</h2>
                <DownloadButton data={data} />
            </div>

            {/* Order Info */}
            <div className="mb-6">
                <p><span className="font-semibold">অর্ডার আইডি:</span> {data._id}</p>
                <div className="space-y-2">
                    <p><span className="font-semibold">অবস্থা:</span>
                        <span className={`ml-2 p-1 rounded text-white text-sm 
      ${orderStatus === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                            {orderStatus}
                        </span>
                    </p>
                    <p><span className="font-semibold">পেমেন্ট:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-white text-sm 
      ${paymentStatus === 'paid' ? 'bg-blue-600' : 'bg-red-500'}`}>
                            {paymentStatus}
                        </span>
                    </p>
                </div>

                <p><span className="font-semibold mt-4 inline-block">অর্ডার তারিখ:</span> {new Date(createdAt).toLocaleString('bn-BD')}</p>
            </div>

            {/* Student Info */}
            <div className="border-t border-gray-200 pt-4">
                <div className=' flex items-center justify-between flex-wrap'>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">👨‍🎓 শিক্ষার্থীর তথ্য</h3>
                   
                </div>

                <div className=' my-10  flex justify-center items-center'>
                    <Image
                        src={studentId.profilePicture || demoProfilePicture}
                        width={200}
                        height={200}
                        alt='campus computer profile pciture'
                        className=' w-[200px] h-[200px] rounded-md'
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><strong>নাম:</strong> {studentId.username}</p>
                    <p><strong>ফোন:</strong> {studentId.phone}</p>
                    <p><strong>রেজিঃ নম্বর:</strong> {studentId.registrationNumber}</p>
                    <p><strong>রোল:</strong> {studentId.boardRoll}</p>
                    <p><strong>ইনস্টিটিউট:</strong> {studentId.instituteName}</p>
                    <p><strong>সেশন:</strong> {studentId.session}</p>
                    <p><strong>ঠিকানা:</strong> {studentId.address}</p>
                    <p><strong>ব্লাড গ্রুপ:</strong> {studentId.bloodGroup}</p>
                </div>
            </div>

            {/* Service Info */}
            <div className="border-t border-gray-200 pt-4 mt-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">📝 সার্ভিস তথ্য</h3>
                <div className="space-y-2 text-sm">
                    <p><strong>সার্ভিস টাইটেল:</strong> {serviceId.title}</p>
                    <p><strong>বর্ণনা:</strong> {serviceId.description}</p>
                    <p><strong>ফি:</strong> <span className="text-green-600 font-bold">{serviceId.fee} টাকা</span></p>
                    <p><strong>প্রোগ্রাম:</strong> {serviceId.program}</p>
                    <p><strong>ডিপার্টমেন্ট:</strong> {serviceId.department}</p>
                    <p><strong>ক্লাস বর্ষ:</strong> {serviceId.classYear}</p>
                    <p><strong>সেশন:</strong> {serviceId.session}</p>
                    <p><strong>প্রয়োজনীয় ডকুমেন্ট:</strong> {serviceId.requiredDocuments?.join(', ')}</p>
                </div>
            </div>

            {/* 📎 ডকুমেন্ট সেকশন */}
            {studentId.documents?.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">📎 আপলোডকৃত ডকুমেন্টসমূহ:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {studentId.documents.map((docUrl, index) => (
                            <DocumentImage key={index} images={docUrl} index={index} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
