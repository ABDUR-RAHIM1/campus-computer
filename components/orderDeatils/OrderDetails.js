
import DocumentImage from '@/components/DocumentImage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { demoProfilePicture } from '@/constans'
import DownloadButton from '@/utilities/DownloadButton'
import { Badge } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


export default async function OrderDetails({ data }) {

    const { profileId, serviceId, reference, paymentStatus, amount, department, status: orderStatus } = data;


    return (
        <div className="max-w-4xl my-10 mx-auto p-6 space-y-8">
            {/* Profile Picture + Download Button */}
            <Card className="shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={profileId?.profilePicture || demoProfilePicture}
                        alt="Profile Picture"
                        width={80}
                        height={80}
                        className="rounded-full border shadow-md object-cover"
                    />
                    <div>
                        <p className="text-lg font-semibold">{profileId?.studentName || "নাম পাওয়া যায়নি"}</p>
                        <p className="text-sm text-muted-foreground">{profileId?.email}</p>
                    </div>
                </div>

                {/* Download Button */}
                <DownloadButton
                    data={data}
                />
            </Card>

            {/* Reference Info */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>👥 অর্ডার দাতা</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <div><strong>Username:</strong> {reference?.username}</div>
                    <div><strong>Phone:</strong> {reference?.phone}</div>
                    <div><strong>Role:</strong> {reference?.role}</div>
                </CardContent>
            </Card>


            {/* Order Summary */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl">🎓 অর্ডার সারাংশ</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">স্ট্যাটাস:</span>
                        <Badge variant="outline" className="capitalize">{orderStatus}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">পেমেন্ট:</span>
                        <Badge variant={paymentStatus === "paid" ? "default" : "destructive"}>
                            {paymentStatus === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">সার্ভিস:</span>
                        <span>{serviceId?.title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">পরিমাণ:</span>
                        <span>{amount} টাকা</span>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Info */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>👤 শিক্ষার্থীর প্রোফাইল</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><strong>নাম:</strong> {profileId?.studentName}</div>
                    <div><strong>ইমেইল:</strong> {profileId?.email}</div>
                    <div><strong>মোবাইল:</strong> {profileId?.guardianPhone}</div>
                    <div><strong>ইনস্টিটিউট:</strong> {profileId?.instituteName}</div>
                    <div><strong>ডিপার্টমেন্ট:</strong> {profileId?.department || department}</div>
                    <div><strong>ক্লাস:</strong> {profileId?.classYear}</div>
                    <div><strong>সেশন:</strong> {profileId?.session}</div>
                    <div><strong>বোর্ড রোল:</strong> {profileId?.boardRoll}</div>
                    <div><strong>রেজিঃ নাম্বার:</strong> {profileId?.registrationNumber}</div>
                    {
                        profileId?.improvementSubjects.length > 0 &&
                        <div><strong>ইম্প্রুভমেন্ট বিষয়সমুহ:</strong> {
                            profileId?.improvementSubjects.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))
                        }</div>
                    }

                    <div><strong>ইম্প্রুভমেন্ট:</strong> {profileId?.hasImprovement ? "আছে" : "নাই"}</div>


                    <div><strong>জন্ম তারিখ:</strong> {new Date(profileId?.birthDate).toLocaleDateString()}</div>
                    <div><strong>লিঙ্গ:</strong> {profileId?.gender}</div>
                    <div className="col-span-full"><strong>ঠিকানা:</strong> {profileId?.address}</div>
                </CardContent>
            </Card>



            {profileId?.documents?.length > 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>📄 সংযুক্ত ডকুমেন্টস</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {profileId.documents.map((doc, index) => (
                            <DocumentImage
                                key={index}
                                images={doc}
                                alt={`Document ${index + 1}`} />
                        ))}
                    </CardContent>
                </Card>
            )
                :
                <div className=' p-4 border border-green-400 bg-green-200 rounded-md'>
                    আপনি কোন ডকুমেন্টস <span className=' font-bold text-red-600'>
                        (রেজিস্ট্রেশন কার্ড , এডমিট কার্ড, মার্কশীট ইত্যাদি)
                    </span> আপলোড করেননি
                </div>

            }

        </div>
    )
}
